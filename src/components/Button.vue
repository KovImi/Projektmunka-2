<template>
  <component :is="tag" :to="to" :href="href" :type="type" :class="['btn', buttonClass, 'rounded-pill']">
    <slot></slot>
  </component>
</template>

<script>
export default {
  /*eslint-disable*/
  name: "Button",
  props: {
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    buttonClass: {
      type: String,
      required: true
    }
  },
  computed: {
    tag() {
      if (this.to) {
        return 'router-link';
      } else if (this.href) {
        return 'a';
      } else {
        return 'button';
      }
    }
  }
};
</script>

<style scoped>
.btn {
  align-items: center;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}
.register-btn {
  background-color: #333333;
}
.login-btn {
  background-color: #4CAF50;
}
.btn:hover,
.btn:focus {
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}
.register-btn:hover,
.register-btn:focus {
  background-color: #4d4d4d; /* Sötétebb szürke a hover állapothoz */
}
.login-btn:hover,
.login-btn:focus {
  background-color: #45a049; /* Sötétebb zöld a hover állapothoz */
}
.btn:hover {
  transform: translateY(-2px);
}
.btn:active {
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
.register-btn:active {
  background-color: #1a1a1a; /* Még sötétebb szürke az active állapothoz */
}
.login-btn:active {
  background-color: #388e3c; /* Még sötétebb zöld az active állapothoz */
}
</style>