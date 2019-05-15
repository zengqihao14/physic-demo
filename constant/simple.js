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
    density: 100,
    mass: 40,
    friction: 0.00001,
    firctionStatic: 0.00001,
    frictionAir: 0.0001,
    options: {
      label: 'solidBox',
      render: {
        fillStyle: '#66b2b2',
        strokeStyle: 'transparent',
        lineWidth: 1,
        sprite: {
          texture: '/texture/haimianbaobao.png',
          xScale: 0.9,
          yScale: 0.9
        }
      },
      collisionFilter: {
        category: 3,
        mask: 1 | 2 | 3
      }
    }
  },
  solidCircle: {
    radius: 30,
    density: 0.3,
    mass: 20,
    friction: 0.00001,
    firctionStatic: 0.00001,
    frictionAir: 0.0001,
    options: {
      label: 'solidCircle',
      render: {
        fillStyle: '#ffcccc',
        strokeStyle: 'transparent',
        lineWidth: 1,
        sprite: {
          texture: '/texture/huaji.png',
          xScale: 1.18,
          yScale: 1.18
        }
      },
      collisionFilter: {
        category: 4,
        mask: 1 | 4
      }
    }
  }
};
