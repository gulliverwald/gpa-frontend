/* eslint-disable react/require-default-props */
import React, {
  memo, useCallback, useState, useReducer, useRef,
} from 'react';
import {
  Autocomplete as MUIAutoComplete,
  AutocompleteProps,
} from '@material-ui/lab';
import {
  CircularProgress,
  TextField,
  TooltipProps as MUITooltipProps,
  Zoom,
} from '@material-ui/core';
import Tooltip from '../Tooltip';
import Input from '../Input';
import { Helper, HelperAction, OptionAction } from './context';

interface IProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'options'>,
    'renderInput'
  > {
  asyncCall: (value: string) => Promise<any>;
  label?: string;
  tooltipProps?: TooltipProps;
  error?: boolean;
  minValue?: number;
  helperText?: string;
  defaultValueInput?: string;
}

type TooltipProps = {
  message: string;
};

interface AutoCompleteTooltipProps extends Omit<MUITooltipProps, 'title'> {
  focused: boolean;
  tooltipProps?: TooltipProps;
  helper: Helper;
}

const helperReducer = (_: Helper, action: HelperAction): Helper => action.payload;

const optionsReducer = (_: unknown[], action: OptionAction): unknown[] => action.payload;

const TooltipAutoComplete = (props: AutoCompleteTooltipProps): JSX.Element => {
  const {
    focused, tooltipProps, helper, ...other
  } = props;
  return (
    <Tooltip
      TransitionComponent={Zoom}
      enterDelay={500}
      leaveDelay={200}
      open={focused && helper.isOpen}
      placement={helper.placement}
      arrow
      {...other}
      title={tooltipProps?.message || ''}
    />
  );
};

function AutoCompleteAsync<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  onChange,
  asyncCall,
  label,
  error,
  defaultValue,
  minValue,
  placeholder,
  helperText,
  tooltipProps,
  defaultValueInput,
  ...rest
}: IProps<T, Multiple, DisableClearable, FreeSolo>): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [options, setOptions] = useReducer(optionsReducer, []);
  const [helper, setHelper] = useReducer(helperReducer, {
    isOpen: false,
    placement: 'bottom-end',
  });
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();
  const [debounce, setDebounce] = useState<NodeJS.Timeout | undefined>();

  const onChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValueInput(value);
      const request = () => {
        if (value.length >= (minValue || 1) && asyncCall) {
          setLoading(true);
          asyncCall(value)
            .then((data) => {
              setOptions({ payload: data });
              setHelper({
                payload: {
                  isOpen: false,
                  placement: 'bottom-start',
                },
              });
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setHelper({
            payload: {
              isOpen: true,
              placement: error ? 'top-start' : 'bottom-start',
            },
          });
        }
      };

      if (debounce) {
        clearTimeout(debounce);
      }
      setDebounce(setTimeout(request, 300));
    },
    [asyncCall, debounce, error, minValue],
  );

  const blur = useCallback((): void => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).blur();
      setFocused(false);
    }
  }, []);

  const handleAutocompleteChange = useCallback(
    (event, value, reason, details): void => {
      blur();
      if (onChange) {
        onChange(event, value, reason, details);
      }
    },
    [blur, onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      switch (event.key) {
        case 'Enter' || 'Escape':
          blur();
          break;
        case 'Tab':
          blur();
          break;
        default:
          break;
      }
    },
    [blur],
  );

  const handleBlur = useCallback((): void => {
    setFocused(false);
  }, []);

  const handleFocus = useCallback((): void => {
    setFocused(true);
  }, []);

  return (
    <MUIAutoComplete
      {...rest}
      onChange={handleAutocompleteChange}
      onBlur={handleBlur}
      loadingText="Carregando..."
      loading={loading}
      onFocus={handleFocus}
      defaultValue={defaultValue}
      noOptionsText="Sem opções"
      options={options as T[]}
      renderInput={(params) => (
        <TooltipAutoComplete
          focused={focused}
          helper={helper}
          tooltipProps={tooltipProps}
        >
          <Input
            {...params}
            label={label}
            variant="outlined"
            error={error}
            defaultValue={defaultValueInput}
            onChange={onChangeCallback}
            inputRef={inputRef}
            helperText={helperText}
            value={valueInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        </TooltipAutoComplete>
      )}
    />
  );
}
export default memo(AutoCompleteAsync) as typeof AutoCompleteAsync;
