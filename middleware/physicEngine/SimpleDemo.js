import {
  Engine,
  Render,
  Runner,
  Events,
  MouseConstraint,
  Mouse,
  World,
  Bodies
} from 'matter-js';

import {
  DEFAULT_ENGINE_OPTIONS,
  DEFAULT_RENDER_OPTIONS,
  DEFAULT_DEBUG_RENDER_OPTIONS,
  DEFAULT_WALL_OPTIONS,
  DEFAULT_SOLID_BOX_STYLE,
  DEFAULT_SOLID_CIRCLE_STYLE
} from '~/constant';

export default class SimpleDemoEngine {
  constructor(bodyEl) {
    this.body = this.getBody(bodyEl);
    this.state = {
      debug: false
    };
    this.init();
  }

  getBody = (el) => ({
    el,
    X: el.offsetWidth,
    Y: el.offsetHeight
  });

  init = () => {
    // create engine
    this.engine = Engine.create(DEFAULT_ENGINE_OPTIONS);

    // create world
    this.world = this.engine.world;

    // create renderer
    this.render = Render.create({
      element: this.body.el,
      engine: this.engine,
      options: Object.assign(this.state.debug ? DEFAULT_DEBUG_RENDER_OPTIONS : DEFAULT_RENDER_OPTIONS, {
        width: this.body.X,
        height: this.body.Y,
        hasBounds: true,
        bounds: {
          min: { x: 0, y: 0 },
          max: { x: this.body.X, y: this.body.Y }
        }
      })
    });

    // create runner
    this.runner = Runner.create();

    // add mouse control
    this.mouse = Mouse.create(this.render.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      },
      collisionFilter: {
        category: 2,
        mask: 3
      }
    });

    // keep the mouse in sync with rendering
    this.render.mouse = this.mouse;
    World.add(this.world, this.mouseConstraint);
    this.bindEvents();
    this.createWall();
    this.createSolidBox();
    this.createSolidCircle();
  };

  bindEvents = () => {
    Events.on(this.engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for (let i = 0, j = pairs.length; i != j; ++i) {
        const pair = pairs[i];
        if (['solidBox', 'solidCircle'].includes(pair.bodyA.label)) {
          pair.bodyA.render.strokeStyle = '#d65b5b';
        }
        if (['solidBox', 'solidCircle'].includes(pair.bodyB.label)) {
          pair.bodyB.render.strokeStyle = '#d65b5b';
        }
      }
    });

    Events.on(this.engine, 'collisionEnd', (event) => {
      const pairs = event.pairs;
      for (let i = 0, j = pairs.length; i != j; ++i) {
        const pair = pairs[i];
        if (['solidBox', 'solidCircle'].includes(pair.bodyA.label)) {
          if (pair.bodyA.label === 'solidBox') {
            pair.bodyA.render.strokeStyle = DEFAULT_SOLID_BOX_STYLE.RENDER.strokeStyle;
          }
          if (pair.bodyA.label === 'solidCircle') {
            pair.bodyA.render.strokeStyle = DEFAULT_SOLID_CIRCLE_STYLE.RENDER.strokeStyle;
          }
        }
        if (['solidBox', 'solidCircle'].includes(pair.bodyB.label)) {
          if (pair.bodyB.label === 'solidBox') {
            pair.bodyB.render.strokeStyle = DEFAULT_SOLID_BOX_STYLE.RENDER.strokeStyle;
          }
          if (pair.bodyB.label === 'solidCircle') {
            pair.bodyB.render.strokeStyle = DEFAULT_SOLID_CIRCLE_STYLE.RENDER.strokeStyle;
          }
        }
      }
    });

    Events.on(this.mouseConstraint, 'startdrag mousedown touchstart', (event) => {
      if (event.body && ['solidBox', 'solidCircle'].includes(event.body.label)) {
        event.body.render.fillStyle = '#FFF';
      }
    });
    Events.on(this.mouseConstraint, 'enddrag mouseup touchend', (event) => {
      if (event.body && event.body.label === 'solidBox') {
        event.body.render.fillStyle = DEFAULT_SOLID_BOX_STYLE.RENDER.fillStyle;
      }
      if (event.body && event.body.label === 'solidCircle') {
        event.body.render.fillStyle = DEFAULT_SOLID_CIRCLE_STYLE.RENDER.fillStyle;
      }
    });
  };

  createWall = () => {
    World.add(this.world, [
      Bodies.rectangle(this.body.X / 2, 0, this.body.X, 30, DEFAULT_WALL_OPTIONS), // top
      Bodies.rectangle(this.body.X / 2, this.body.Y, this.body.X, 30, DEFAULT_WALL_OPTIONS), // bottom
      Bodies.rectangle(this.body.X, this.body.Y / 2, 30, this.body.Y, DEFAULT_WALL_OPTIONS), // right
      Bodies.rectangle(0, this.body.Y / 2, 30, this.body.Y, DEFAULT_WALL_OPTIONS) // left
    ]);
  };

  createSolidBox = () => {
    const positionX = Math.min(Math.max(Math.random() * this.body.X, 30), this.body.X - 30);
    const solid = Bodies.rectangle(positionX, 60, 60, 60, {
      label: 'solidBox',
      render: DEFAULT_SOLID_BOX_STYLE.RENDER,
      collisionFilter: DEFAULT_SOLID_BOX_STYLE.COLLISION_FILTER
    });
    World.add(this.world, [ solid ]);
  };

  createSolidCircle = () => {
    const positionX = Math.min(Math.max(Math.random() * this.body.X, 30), this.body.X - 30);
    const solid = Bodies.circle(positionX, 60, 30, {
      label: 'solidCircle',
      render: DEFAULT_SOLID_CIRCLE_STYLE.RENDER,
      collisionFilter: DEFAULT_SOLID_CIRCLE_STYLE.COLLISION_FILTER
    });
    World.add(this.world, [ solid ]);
  };

  run = () => {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: this.body.X, y: this.body.Y }
    });
  };

  stop = () => {
    Render.stop(this.render);
    Runner.stop(this.runner);
  };

  reset = () => {
    this.world.bodies = [];
    this.createWall();
  };

  toggleDebugMode = () => {
    this.state.debug = !this.state.debug;
    this.render.options = Object.assign(this.state.debug ? DEFAULT_DEBUG_RENDER_OPTIONS : DEFAULT_RENDER_OPTIONS, {
      width: this.body.X,
      height: this.body.Y,
      hasBounds: true,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: this.body.X, y: this.body.Y }
      }
    });
  };
}
