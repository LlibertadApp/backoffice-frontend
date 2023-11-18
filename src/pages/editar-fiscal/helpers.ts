import { Key } from 'react';

export function getDistritos() {
  const distritosSet = new Set();
  const distritos = [];
  for (const item of [] as any[]) {
    const distritoId = item.distrito_id;

    // Check if distritoId is not already in the Set
    if (!distritosSet.has(distritoId)) {
      distritosSet.add(distritoId);
      distritos.push({ distrito_id: distritoId, distrito_nombre: item.distrito_nombre });
    }
  }

  return distritos;
}

export function getElectoralSectionsByDistritoId(targetDistritoId: Key) {
  const electoralSectionsSet = new Set();
  const electoralSections = [];

  for (const item of [] as any[]) {
    if (item.distrito_id == targetDistritoId) {
      const electoralSectionId = item.seccionprovincial_id;

      // Check if the electoralSectionId is not already in the Set
      if (!electoralSectionsSet.has(electoralSectionId)) {
        electoralSectionsSet.add(electoralSectionId);

        const electoralSectionNombre = item.seccionprovincial_nombre;

        electoralSections.push({
          seccionprovincial_id: electoralSectionId,
          seccionprovincial_nombre: electoralSectionNombre,
        });
      }
    }
  }

  return electoralSections;
}

export function getSectionsByElectoralSectionId(targetElectoralSectionID: Key) {
  const sectionsSet = new Set();
  const sections = [];

  for (const item of [] as any[]) {
    if (item.seccionprovincial_id == targetElectoralSectionID) {
      const sectionId = item.seccion_id;

      // Check if the sectionId is not already in the Set
      if (!sectionsSet.has(sectionId)) {
        sectionsSet.add(sectionId);

        const sectionNombre = item.seccion_nombre;

        sections.push({
          seccion_id: sectionId,
          seccion_nombre: sectionNombre,
        });
      }
    }
  }

  return sections;
}

export function getCircuitBySectionId(targetSectionID: Key) {
  const circuitSet = new Set();
  const circuit = [];

  for (const item of [] as any[]) {
    if (item.seccion_id == targetSectionID) {
      const circuitId = item.circuito_id;

      // Check if the circuitId is not already in the Set
      if (!circuitSet.has(circuitId)) {
        circuitSet.add(circuitId);

        const circuitNombre = item.circuito_nombre;

        circuit.push({
          circuito_id: circuitId,
          circuito_nombre: circuitNombre,
        });
      }
    }
  }

  return circuit;
}

export function getEstablishmentByCircuitId(targetCircuitID: Key) {
  const establishmentSet = new Set();
  const establishment = [];

  for (const item of [] as any[]) {
    if (item.circuito_id == targetCircuitID) {
      const establishmentId = item.id_colegio;

      // Check if the establishmentId is not already in the Set
      if (!establishmentSet.has(establishmentId)) {
        establishmentSet.add(establishmentId);

        const establishmentName = item.colegio;

        establishment.push({
          id_colegio: establishmentId,
          colegio: establishmentName,
        });
      }
    }
  }

  return establishment;
}
