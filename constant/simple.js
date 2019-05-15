export const COLLISION_BODIES = ['solidBox', 'solidCircle'];

export const BODIES_CONFIG = {
  boundaryWall: {
    width: 30,
    options: {
      isStatic: true,
      label: 'boundaryWall',
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
  solidBox: {
    width: 60,
    height: 60,
    options: {
      label: 'solidBox',
      render: {
        fillStyle: '#66b2b2',
        strokeStyle: 'transparent',
        lineWidth: 1
      },
      collisionFilter: {
        category: 3,
        mask: 1 | 2 | 3
      }
    }
  },
  solidCircle: {
    radius: 30,
    options: {
      label: 'solidCircle',
      render: {
        fillStyle: '#ffcccc',
        strokeStyle: 'transparent',
        lineWidth: 1
      },
      collisionFilter: {
        category: 4,
        mask: 1 | 4
      }
    }
  }
};
