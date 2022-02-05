import api from '../services/api';

interface IResponseAddressByCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface IApiResponseCity {
  nome: string;
}

interface IResponseCity {
  value?: string;
  description: string;
}

interface IResponseUF {
  description: string;
}

// Buscando os dados de um endereço pelo CEP
export const getAddressByCep = async (cep: string): Promise<IResponseAddressByCep> => {
  const { data: addressData } = await api.get<IResponseAddressByCep>(
    `https://viacep.com.br/ws/${cep}/json/`,
    {
      baseURL: '',
      headers: {
        common: '',
      },
    }
  );

  return addressData;
}

// Buscando a lista das cidades pela UF
export const getCitiesListByUF = async (uf: string): Promise<IResponseCity[]> => {
  let citiesArray: IResponseCity[] = [];

  try {
    const { data: citiesArrayApi } = await api.get<IApiResponseCity[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=name`,
      {
        baseURL: '',
        headers: {
          common: '',
        },
      }
    );

    citiesArray = citiesArrayApi.map(city => ({
      description: city.nome,
    }))
  } catch {
    citiesArray = [];
  }

  citiesArray.push({ description: 'Outro', value: '--' })

  return citiesArray;
}

export const getUFsList = (): IResponseUF[] => {
  return [
    { description: 'Outro' },
    { description: 'AC' },
    { description: 'AL' },
    { description: 'AP' },
    { description: 'AM' },
    { description: 'BA' },
    { description: 'CE' },
    { description: 'DF' },
    { description: 'ES' },
    { description: 'GO' },
    { description: 'MA' },
    { description: 'MT' },
    { description: 'MS' },
    { description: 'MG' },
    { description: 'PA' },
    { description: 'PB' },
    { description: 'PR' },
    { description: 'PE' },
    { description: 'PI' },
    { description: 'RJ' },
    { description: 'RN' },
    { description: 'RS' },
    { description: 'RO' },
    { description: 'RR' },
    { description: 'SC' },
    { description: 'SP' },
    { description: 'SE' },
    { description: 'TO' },
  ];
}
