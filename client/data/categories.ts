// tslint:disable-next-line: class-name
export interface _Assignature {
  name: string;
  short: string;
}

// tslint:disable-next-line: class-name
export interface _Career {
  name: string;
  short: string;
}

// tslint:disable-next-line: class-name
export interface _Department {
  name: string;
  short: string;
  careers: { [id: number]: _Career };
  assignatures: { [id: number]: Array<Array<number>> };
}

export interface Assignature {
  id: number;
  name: string;
  short: string;
}

export interface Career {
  id: number;
  name: string;
  short: string;
}

export interface Group {
  category: number;
  links: number[];
}

export interface Assignee {
  id: number;
  groups: Group[];
}

export interface Department {
  id: number;
  name: string;
  short: string;
  careers: Career[];
  assignatures: Assignee[];
}

// tslint:disable-next-line: variable-name
export const _assignatures: { [id: number]: _Assignature } = {
  1: {
    name: 'Matemática Básica',
    short: 'Básica'
  },
  2: {
    name: 'Fundamentos de Programación',
    short: 'Fupro'
  },
  3: {
    name: 'Química General',
    short: 'Quimica'
  }
};

// tslint:disable-next-line: variable-name
export const _departments: { [id: number]: _Department } = {
  1: {
    name: 'Facultad de Ingeniería y Ciencias Hídricas',
    short: 'FICH',
    careers: {
      1: {
        name: 'Ingeniería en Informática',
        short: 'Informática'
      },
      2: {
        name: 'Ingeniería Ambiental',
        short: 'Ambiental'
      },
      3: {
        name: 'Ingeniería en Agrimensura',
        short: 'Agrimensura'
      },
      4: {
        name: 'Ingeniería en Recursos Hídricos',
        short: 'Hídrica'
      }
    },
    assignatures: {
      1: [[1, 2, 3, 4]],
      2: [[1]],
      3: [[2, 4], [1, 3]]
    }
  },
  2: {
    name: 'Facultad de Bioquímica y Ciencias Biológicas',
    short: 'FBCB',
    careers: {
      1: {
        name: 'Bioquímica',
        short: 'Bioquímica'
      },
      2: {
        name: 'Licenciatura en Biotecnología',
        short: 'Biotecnología'
      }
    },
    assignatures: {
      1: [[1, 2]],
      3: [[1, 2]]
    }
  }
};

export const assignatures: Assignature[] = [];
for (const key of Object.keys(_assignatures)) {
  const assignature: _Assignature = _assignatures[key];
  assignatures.push({
    id: +key,
    name: assignature.name,
    short: assignature.short
  });
}

let category = 1;
export const departments: Department[] = [];
for (const key of Object.keys(_departments)) {
  const department: _Department = _departments[key];
  const nDep: Department = {
    id: +key,
    name: department.name,
    short: department.short,
    careers: [],
    assignatures: []
  };

  for (const cKey of Object.keys(department.careers)) {
    const career: _Career = department.careers[cKey];
    nDep.careers.push({
      id: +cKey,
      name: career.name,
      short: career.short
    });
  }

  for (const aKey of Object.keys(department.assignatures)) {
    const assignature = department.assignatures[aKey];
    const nAssi: Assignee = {
      id: +aKey,
      groups: []
    };

    for (const group of assignature) {
      nAssi.groups.push({
        category: category++,
        links: group
      });
    }

    nDep.assignatures.push(nAssi);
  }

  departments.push(nDep);
}
