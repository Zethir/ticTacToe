<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-size: 6vmin;
}

@media (min-width: 350px) {
  html {
    font-size: 5vmin;
  }
}

@media (min-width: 450px) {
  html {
    font-size: 4vmin;
  }
}

@media (min-width: 550px) {
  html {
    font-size: 3vmin;
  }
}

@media (min-width: 900px) {
  html {
    font-size: 2vmax;
  }
}
</style>
