import { Key } from 'react';
import { staticDataAxios } from '../utils/axiosAdapter';

export const distritos = {
  1: 'Ciudad Autónoma de Buenos Aires',
  2: 'Buenos Aires',
  3: 'Catamarca',
  4: 'Córdoba',
  5: 'Corrientes',
  6: 'Chaco',
  7: 'Chubut',
  8: 'Entre Ríos',
  9: 'Formosa',
  10: 'Jujuy',
  11: 'La Pampa',
  12: 'La Rioja',
  13: 'Mendoza',
  14: 'Misiones',
  15: 'Neuquén',
  16: 'Río Negro',
  17: 'Salta',
  18: 'San Juan',
  19: 'San Luis',
  20: 'Santa Cruz',
  21: 'Santa Fe',
  22: 'Santiago del Estero',
  23: 'Tucumán',
  24: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
};

export interface DistritoResponse {
  distrito_id: number;
  seccionprovincial: {
    [key: number]: {
      seccionprovincial_id: number;
      seccionprovincial_nombre: string;
      secciones: {
        [key: number]: {
          seccion_id: number;
          seccion_nombre: string;
          circuitos: {
            [key: string]: {
              circuito_id: string;
              circuito_nombre: string;
              src: string;
            };
          };
        };
      };
    };
  };
}

export interface CircuitoResponse {
  circuito_id: string;
  circuito_nombre: string;
  colegios: {
    id_colegio: string;
    uid_colegio: string;
    colegio: string;
    mesas: {
      mesa_id: number;
      identificador_unico_mesa: string;
      uid_mesa: string;
      coordinates: {
        longitude: number;
        latitude: number;
      };
    }[];
  }[];
}

export const getDistritoById = async (distritoID: Key) => {
  const { data } = await staticDataAxios.get<DistritoResponse>(`${distritoID}.json`);
  return data;
};

export const getCircuitoById = async (district: Key, electoralSection: Key, section: Key, circuit: Key) => {
  const { data } = await staticDataAxios.get<CircuitoResponse>(
    `${district}/${electoralSection}/${section}/${circuit}.json`
  );
  return data;
};
