import axios from '../utils/axiosAdapter';

interface postFiscalInterface {
  fullName: string;
  votingTables: string[];
}

export const postFiscal = async (postData: postFiscalInterface) => {
  return await axios.post(`/v1/fiscals`, postData);
};

interface editFiscalInterface {
  fullName?: string;
  votingTables?: string[];
}

export const editFiscal = async (editFiscal: editFiscalInterface) => {
  return await axios.put(`/v1/fiscals`, editFiscal);
};

interface VotingTable {
  id: string;
  uuid: string;
  establishmentId: string;
  sectionId: string;
  subsectionId: string;
  circuitId: string;
  districtId: string;
}

export interface Fiscal {
  id: string;
  createdBy: string;
  fullName: string;
  email: string;
  phoneNo: string;
  votingTables: VotingTable[];
}

export const getFiscales = async () => {
  const { data } = await axios.get<Fiscal[]>('/v1/fiscals');

  // Ordenamos los fiscales por la fecha de creación
  return data.sort((a, b) => {
    const dateA = new Date(a.createdBy);
    const dateB = new Date(b.createdBy);
    return dateB.getTime() - dateA.getTime();
  });
};

export const generateFiscalToken = async (fiscalID: string) => {
  const { data } = await axios.post<{ link: string }>(`/v1/fiscals/${fiscalID}/authorize`);
  return data.link;
};
