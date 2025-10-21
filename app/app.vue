<script setup lang="ts">
import Login from './pages/login.vue'
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
<style>
html, 
body {
  padding:0;
  margin:0
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root{
  --button-blue:#4285f4;
  --progress-blue:#266dd3;
  --side-blue:#052444;
  --border-color:#ebebeb;
  --inactive-color:#f6f6f6;
  --secondary-copy:#595959;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin:0;
  padding:0;
}
header {
  background-color: #f5f5f5;
  padding: 1.5rem 0;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 50;
  height:20px;
}
main{
  /* padding:20px */
}
footer{
  margin-top:30px;
  background-color: #f5f5f5;
  height:100px;
}

a {
    color: #442957;
    text-decoration: none;
}
button,
.button {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: #FFF;
    border: 1px solid #CCC;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.55;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-grow: 1;
    color:#333;
}
button:not(:disabled):hover,
.button:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
button:disabled{
  cursor: default;
}
select {
  display: block;
  width: 100%;
  height: 35px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.55;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color 
ease-in-out .15s, box-shadow 
ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color 
ease-in-out .15s, box-shadow 
ease-in-out .15s;
}
label {
  font-weight: bold;
}
</style>