import { Key } from 'react';
import { CircuitoResponse, DistritoResponse } from '../../services/mesas';

export const getElectoralSectionsFromDistritoObject = (distritoObject: DistritoResponse) => {
  return Object.values(distritoObject.seccionprovincial).map((seccionProvincial) => ({
    id: seccionProvincial.seccionprovincial_id,
    value: seccionProvincial.seccionprovincial_nombre,
  }));
};

export const getSectionsByElectoralSectionId = (distritoObject: DistritoResponse, electoralSectionId: Key) => {
  return Object.values(distritoObject.seccionprovincial[Number(electoralSectionId)].secciones).map((seccion) => ({
    id: seccion.seccion_id,
    value: seccion.seccion_nombre,
  }));
};

export const getCircuitsBySectionId = (distritoObject: DistritoResponse, electoralSectionId: Key, sectionId: Key) => {
  return Object.values(distritoObject.seccionprovincial[Number(electoralSectionId)].secciones[Number(sectionId)].circuitos).map((circuito) => ({
    id: circuito.circuito_id,
    value: circuito.circuito_nombre,
  }));
};

export const getEstablishmentsByCircuitObject = (circuitObject: CircuitoResponse) => {
  return Object.values(circuitObject.colegios).map((colegio) => ({ id: colegio.id_colegio, value: colegio.colegio }));
};

export const getMesasByEstablishmentId = (circuitObject: CircuitoResponse, establishment: Key) => {
  const colegio = circuitObject.colegios.find((colegio) => colegio.id_colegio == establishment);
  return colegio?.mesas.map((mesa) => ({ id: mesa.uid_mesa, value: mesa.identificador_unico_mesa })) ?? [];
};
