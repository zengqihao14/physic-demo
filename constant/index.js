export const DEFAULT_ENGINE_OPTIONS = {
  enableSleeping: true
};

export const DEFAULT_RENDER_OPTIONS = {
  wireframes: false,
  background: '#FDF9F3',
  showVelocity: true,
  showAngleIndicator: true,
  showCollisions: true,
  showIds: true,
  showPositions: true
};

export const DEFAULT_WALL_OPTIONS = {
  isStatic: true,
  label: 'boundaryWall',
  render: {
    fillStyle: '#dbdbdb',
    strokeStyle: '#FFF',
    lineWidth: 1
  }
};

export const DEFAULT_BODY_STYLE = {
  RENDER: {
    fillStyle: 'transparent',
    strokeStyle: 'rgba(0, 0, 0, .25)',
    lineWidth: 1
  }
};
