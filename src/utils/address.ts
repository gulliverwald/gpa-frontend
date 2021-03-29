const API = 'https://viacep.com.br/ws';

export type AddressInput = {
  adjunct?: string | null;
  city?: string | null;
  country?: string | null;
  district?: string | null;
  number?: string | null;
  street?: string | null;
  uf?: string | null;
  zip?: string | null;
};

const asyncGetAddress = async (zipCode: string): Promise<AddressInput> => new Promise((resolve) => {
  if (!zipCode) {
    resolve({});
  } else {
    fetch(`${API}/${zipCode}/json`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch(() => {
        resolve({});
      })
      .then((response) => {
        if (response && !response.erro) {
          resolve({
            city: response.localidade,
            uf: response.uf,
            district: response.bairro,
            street: response.logradouro,
            adjunct: response.complemento,
            number: '',
            country: 'Brasil',
          } as AddressInput);
        } else {
          resolve({});
        }
      });
  }
});

export default asyncGetAddress;
