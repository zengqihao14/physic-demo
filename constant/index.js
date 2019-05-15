export const DEFAULT_ENGINE_OPTIONS = {
  enableSleeping: true
};

export const DEFAULT_RENDER_OPTIONS = {
  wireframes: false,
  background: '#FDF9F3',
  showVelocity: false,
  showAngleIndicator: false,
  showCollisions: false,
  showIds: false,
  showPositions: false,
  showConvexHulls: false,
  showMousePosition: false
};

export const DEFAULT_DEBUG_RENDER_OPTIONS = {
  wireframes: true,
  background: '#FDF9F3',
  showVelocity: true,
  showAngleIndicator: true,
  showCollisions: true,
  showIds: true,
  showPositions: true,
  showConvexHulls: true,
  showMousePosition: true
};

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

export const DEFAULT_SOLID_BOX_STYLE = {
  RENDER: {
    fillStyle: '#66b2b2',
    strokeStyle: 'transparent',
    lineWidth: 1
  },
  COLLISION_FILTER: {
    category: 3,
    mask: 1 | 2 | 3
  },
};

export const DEFAULT_SOLID_CIRCLE_STYLE = {
  RENDER: {
    fillStyle: '#ffcccc',
    strokeStyle: 'transparent',
    lineWidth: 1
  },
  COLLISION_FILTER: {
    category: 4,
    mask: 1 | 4
  },
}
