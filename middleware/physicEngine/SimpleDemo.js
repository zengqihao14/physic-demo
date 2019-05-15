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
  COLLISION_BODIES,
  BODIES_CONFIG
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
        if (COLLISION_BODIES.includes(pair.bodyA.label)) {
          pair.bodyA.render.strokeStyle = '#d65b5b';
        }
        if (COLLISION_BODIES.includes(pair.bodyB.label)) {
          pair.bodyB.render.strokeStyle = '#d65b5b';
        }
      }
    });

    Events.on(this.engine, 'collisionEnd', (event) => {
      const pairs = event.pairs;
      for (let i = 0, j = pairs.length; i != j; ++i) {
        const pair = pairs[i];
        if (COLLISION_BODIES.includes(pair.bodyA.label)) {
          pair.bodyA.render.strokeStyle = BODIES_CONFIG[pair.bodyA.label].options.render.strokeStyle;
        }
        if (COLLISION_BODIES.includes(pair.bodyB.label)) {
          pair.bodyB.render.strokeStyle = BODIES_CONFIG[pair.bodyB.label].options.render.strokeStyle;
        }
      }
    });

    Events.on(this.mouseConstraint, 'startdrag mousedown touchstart', (event) => {
      if (event.body && COLLISION_BODIES.includes(event.body.label)) {
        event.body.render.fillStyle = '#FFF';
      }
    });
    Events.on(this.mouseConstraint, 'enddrag mouseup touchend', (event) => {
      if (event.body && COLLISION_BODIES.includes(event.body.label)) {
        event.body.render.strokeStyle = BODIES_CONFIG[event.body.label].options.render.strokeStyle;
      }
    });
  };

  createWall = () => {
    World.add(this.world, [
      // top
      Bodies.rectangle(
        this.body.X / 2, 0,
        this.body.X, BODIES_CONFIG.boundaryWall.width,
        BODIES_CONFIG.boundaryWall.options
      ),
      // bottom
      Bodies.rectangle(
        this.body.X / 2, this.body.Y,
        this.body.X, BODIES_CONFIG.boundaryWall.width,
        BODIES_CONFIG.boundaryWall.options
      ),
      // right
      Bodies.rectangle(
        this.body.X, this.body.Y / 2,
        BODIES_CONFIG.boundaryWall.width, this.body.Y,
        BODIES_CONFIG.boundaryWall.options
      ),
      // left
      Bodies.rectangle(
        0, this.body.Y / 2,
        BODIES_CONFIG.boundaryWall.width, this.body.Y,
        BODIES_CONFIG.boundaryWall.options
      )
    ]);
  };

  createSolidBox = () => {
    const positionX = Math.min(Math.max(Math.random() * this.body.X, 30), this.body.X - 30);
    const box = Bodies.rectangle(
      positionX, 60,
      BODIES_CONFIG.solidBox.width, BODIES_CONFIG.solidBox.height,
      BODIES_CONFIG.solidBox.options
    );
    World.add(this.world, [ box ]);
  };

  createSolidCircle = () => {
    const positionX = Math.min(Math.max(Math.random() * this.body.X, 30), this.body.X - 30);
    const circle = Bodies.circle(
      positionX, 60, BODIES_CONFIG.solidCircle.radius,
      BODIES_CONFIG.solidCircle.options
    );
    World.add(this.world, [ circle ]);
  };

  randomCreate = () => {
    Math.floor(Math.random()*2) ? this.createSolidBox() : this.createSolidCircle();
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
