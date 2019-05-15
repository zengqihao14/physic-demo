import {
  Engine,
  Render,
  Runner,
  Events,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Constraint
} from 'matter-js';

import {
  DEFAULT_ENGINE_OPTIONS,
  DEFAULT_WORLD_OPTIONS,
  DEFAULT_RENDER_OPTIONS,
  DEFAULT_DEBUG_RENDER_OPTIONS,
} from '~/constant';
import {
  COLLISION_BODIES,
  BODIES_CONFIG,
  FORCE_LIMIT
} from '~/constant/car';

export default class CarDemoEngine {
  constructor(bodyEl) {
    this.body = this.getBody(bodyEl);
    this.state = {
      debug: false,
      force: 0
    };
    this.carBody = null;
    this.carCircle = null;
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
    this.world.gravity = DEFAULT_WORLD_OPTIONS.gravity;

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
        mask: 4 | 5
      }
    });

    // keep the mouse in sync with rendering
    this.render.mouse = this.mouse;
    World.add(this.world, this.mouseConstraint);
    this.bindEvents();
    this.createWall();
    this.createFloor();
    this.createCar();
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
        event.body.render.fillStyle = BODIES_CONFIG[event.body.label].options.render.fillStyle;
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

  createFloor = () => {
    World.add(this.world, [
      // top
      Bodies.rectangle(
        (this.body.X - 300) / 2, 120,
        this.body.X, BODIES_CONFIG.floor.width,
        Object.assign(BODIES_CONFIG.floor.options, {
          friction: 1,
          frictionStatic: 0.1,
          angle: Math.PI * 0.06
        })
      ),
      // center
      Bodies.rectangle(
        (this.body.X + 250) / 2, 370,
        this.body.X, BODIES_CONFIG.floor.width,
        Object.assign(BODIES_CONFIG.floor.options, {
          friction: 0.6,
          frictionStatic: 0.6,
          angle: Math.PI * -0.06
        })
      )
    ]);
  };

  createCar = () => {
    // const car = Composites.car(40, 20, BODIES_CONFIG.car.width, BODIES_CONFIG.car.height, BODIES_CONFIG.car.wheelSize);
    // console.log(car)

    const carBody = Bodies.rectangle(
      50, 20,
      BODIES_CONFIG.carBody.width, BODIES_CONFIG.carBody.height,
      BODIES_CONFIG.carBody.options
    );
    const carCircleA = Bodies.circle(
      40, 20,
      BODIES_CONFIG.carCircle.radius,
      BODIES_CONFIG.carCircle.options
    );
    const carCircleB = Bodies.circle(
      100, 20,
      BODIES_CONFIG.carCircle.radius,
      BODIES_CONFIG.carCircle.options
    );
    const constraintA = Constraint.create({
      bodyA: carCircleA,
      pointA: { x: 0, y: 0 },
      bodyB: carBody,
      pointB: { x: -(BODIES_CONFIG.carBody.width / 2 - 5), y: 0 },
      stiffness: 0,
      length: 0,
      damping: 0
    });
    const constraintB = Constraint.create({
      bodyA: carCircleB,
      pointA: { x: 0, y: 0 },
      bodyB: carBody,
      pointB: { x: BODIES_CONFIG.carBody.width / 2 - 5, y: 0 },
      stiffness: 0,
      length: 0,
      damping: 0
    });
    this.carBody = carBody;
    this.carCircle = carCircleB;
    World.add(this.world, [ carCircleA, carCircleB, carBody, constraintA, constraintB ]);
  };

  carGoForward = () => {

    this.carBody.force.x = Math.min(this.carBody.force.x + 0.002, FORCE_LIMIT);
  };

  carGoBackward = () => {
    this.carBody.force.x = Math.min(this.carBody.force.x - 0.002, FORCE_LIMIT);
  };

  carGoUp = () => {
    this.carCircle.vertices[0].body.force.y = Math.min(this.carCircle.vertices[0].body.force.y - 0.002, FORCE_LIMIT);
  };

  carGoDown = () => {
    this.carCircle.vertices[0].body.force.y = Math.min(this.carCircle.vertices[0].body.force.y + 0.002, FORCE_LIMIT);
  };

  carJump = () => {
    this.carBody.force.y= - 0.03;
  };

  carHorizontalRelease = () => {
    this.carBody.force.x = 0;
  };

  carVerticalRelease = () => {
    this.carCircle.force.y = 0;
  };

  carJumpRelease = () => {
    this.carBody.force.y = 0;
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
    this.createFloor();
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
