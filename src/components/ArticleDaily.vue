<template>
  <div class="article-daily">
    <ApolloQuery
      :query="require('@/graphql/dailyArticle.gql')"
      v-slot="{ result: { loading, error, data } }"
    >
      <div v-if="error" class="error apollo"></div>
      <div v-else-if="data" v-loading="loading">
        <el-card :body-style="{ padding: 0, borderColor: 'transparent' }">
          <article>
            <div class="article-head">
              <img src="" alt="" class="img" />
              <h2>Daily Article</h2>
            </div>
            <div class="article-main" v-html="data.dailyArticle.article"></div>
            <p class="date">Posted on {{ new Date().toLocaleDateString() }}</p>
          </article>
        </el-card>
      </div>
    </ApolloQuery>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ArticleDaily extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Work+Sans|Yatra+One&display=swap');
// $bg-img: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
$bg-img: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
$p-bg-img: 'https://cdn.pixabay.com/photo/2019/03/03/20/23/flowers-4032775_1280.png';
.article-daily {
  width: 100%;
  height: 100%;
  h2 {
    color: white;
    text-align: center;
  }

  & > .el-card {
    height: 100%;
    border-color: transparent;
  }

  .article-head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 11rem;
    font-size: 2rem;
    // color: wheat;
    background-image: url($bg-img);
    background-color: rgba($color: #ffffff, $alpha: 0.1);
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat;

    h2 {
      font-family: 'Yatra One';
    }
  }

  p.date {
    margin: 0.5rem;
    color: #bbb;
    font-size: 0.9em;
    font-style: italic;
    text-align: center;
  }

  div.article-main {
    margin: auto;
    padding: 0 1.3rem;
    // background-image: url($p-bg-img);
    p {
      line-height: 1.5;
      text-indent: 1em;
      font-family: 'Work Sans', sans-serif;
      &:nth-child(1)::first-letter {
        text-transform: capitalize;
        font-size: 1.5em;
        font-weight: bold;
      }
    }
  }
}
</style>
