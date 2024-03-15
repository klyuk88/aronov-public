<script setup>
const props = defineProps(['mainPage'])
</script>

<template>
  <section class="estimation">
    <div class="container">
      <div class="estimation-content">

        <div class="estimation-item"
        v-for="(item, index) in props.mainPage.data.attributes.ratings" :key="item.id"
        >
          <div class="estimation-item-image_wrap">
            <img :src="$config.public.api + item.logo.data.attributes.url" alt="" />
          </div>

          <h3 class="estimation-item-title w-50">
            {{item.title}}
          </h3>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss">
.estimation {
  // padding-top: 68px;
  &-title {
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    @media screen and (max-width: 1100px) {
      font-size: 24px;
      font-weight: 400;
    }
  }
  &-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 0px;
    @media screen and (max-width: 1100px) {
      margin-top: 60px;
    }
  }
  &-item {
    display: flex;
    align-items: center;
    gap: 30px;
    &-title {
      font-size: 14px;
      font-weight: 400;
      @media screen and (max-width: 1100px) {
        display: none;
        font-weight: 400;
      }
    }
  }
  &-item:first-child {
    img {
      width: 37px;
      @media screen and (max-width: 1100px) {
        width: 35px;
      }
    }
  }
  &-item:nth-child(2) {
    img {
      width: 84px;
      @media screen and (max-width: 1100px) {
        width: 67px;
      }
    }
  }
  &-item:nth-child(3) {
    img {
      width: 105px;
      @media screen and (max-width: 1100px) {
        width: 67px;
      }
    }
  }
}

.estimation.section-top {
  @media screen and (max-width: 1100px) {
    padding-top: 0px;
  }
}
.estimation-item:first-child {
  @media screen and (max-width: 1100px) {
    .estimation-item-image_wrap {
      margin-right: auto;
    }
  }
}
.estimation-item:nth-child(2) {
  @media screen and (max-width: 1100px) {
    .estimation-item-image_wrap {
      margin: 0 auto;
    }
  }
}
.estimation-item:last-child {
  @media screen and (max-width: 1100px) {
    .estimation-item-image_wrap {
      margin-left: auto;
    }
  }
}
// .estimation-item-image_wrap {
//   @media screen and (max-width: 1100px) {
//     margin: 0 auto;
//   }
// }
</style>