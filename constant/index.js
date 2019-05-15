export const DEFAULT_ENGINE_OPTIONS = {
  enableSleeping: true,
  positionIterations: 10,
  velocityIterations: 10,
  constraintIterations: 5
};

export const DEFAULT_WORLD_OPTIONS = {
  gravity: {
    scale: 0.001,
    x: 0,
    y: 1,
  }
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
