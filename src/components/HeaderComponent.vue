<template>
  <div>
    <header>
      <ul>
        <!-- <li><a href="">Главная</a></li>
                <li><a href="">Найти билет по габариту</a></li>
                <li><a href="">Влезет ли сумка?</a></li>
                <li><a href="">Профиль</a></li> -->
        <li><router-link to="/">Главная</router-link></li>
        <li>
          <router-link to="/get-ticket">Найти билет по габариту</router-link>
        </li>
        <li><router-link to="/check-bag">Влезет ли сумка?</router-link></li>
        <li><router-link to="/profile">Профиль</router-link></li>
      </ul>
    </header>
  </div>
</template>
<script>
</script>
<style>
header {
  width: 100%;
  height: 50px;
  background-color: rgb(48, 145, 235);
  display: flex;
  justify-content: center;
}

ul {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  list-style-type: none;
}

li > a {
  text-decoration: none;
  color: white;
  font-size: larger;
  font-weight: 600;
  transition: 0.5s;
}

li > a:hover {
  color: black;
  font-size: x-large;
}
</style>