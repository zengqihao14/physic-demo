export const COLLISION_BODIES = ['floor', 'carBody', 'carCircle'];

export const BODIES_CONFIG = {
  boundaryWall: {
    width: 30,
    options: {
      isStatic: true,
      label: 'boundaryWall',
      frictionStatic: 0.1,
      render: {
        fillStyle: '#dbdbdb',
        strokeStyle: '#FFF',
        lineWidth: 1
      },
      collisionFilter: {
        category: 1,
        mask: 4 | 5
      }
    }
  },
  floor: {
    width: 10,
    options: {
      label: 'floor',
      isStatic: true,
      render: {
        fillStyle: '#6f7682',
        strokeStyle: 'transparent',
        lineWidth: 1
      },
      collisionFilter: {
        category: 3,
        mask: 1 | 2 | 4
      }
    }
  },
  car: {
    width: 100,
    height: 10,
    wheelSize: 20,
    label: 'car'
  },
  carBody: {
    width: 90,
    height: 10,
    density: 100,
    mass: 400,
    options: {
      label: 'carBody',
      render: {
        fillStyle: '#464f5e',
        strokeStyle: 'transparent',
        lineWidth: 1
      },
      collisionFilter: {
        category: 3,
        mask: 1 | 2
      }
    }
  },
  carCircle: {
    radius: 20,
    options: {
      label: 'carCircle',
      density: 0.8,
      mass: 40,
      friction: 0.00001,
      firctionStatic: 0.00001,
      frictionAir: 0.0005,
      render: {
        fillStyle: '#66b2b2',
        strokeStyle: 'transparent',
        lineWidth: 1
      },
      collisionFilter: {
        category: 4,
        mask: 1 | 2 | 4
      }
    }
  }
};
