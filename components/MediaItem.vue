<script setup>
const props = defineProps(["mediaItem"]);

</script>
<template>
  <div>
    <NuxtLink :to="`/media/${props.mediaItem.attributes.slug}`">
      <div
        class="media-item"
        :class="{
          'no-image': props.mediaItem.attributes.thumbnail.data ? false : true,
        }"
      >
        <!-- <div class="img-wrap position-absolute w-100 h-100 start-0 top-0"> -->
        <img
          v-if="props.mediaItem.attributes.thumbnail.data"
          :src="
            $config.public.api +
            props.mediaItem.attributes.thumbnail.data.attributes.url
          "
          alt="media-thumbnail"
          class="media-item-thumb"
        />
        <!-- </div> -->

        <div class="media-item-header">
          <p v-if="props.mediaItem.attributes.practice.data">
            {{ props.mediaItem.attributes.practice.data.attributes.title }}
          </p>
        </div>
        <div class="media-item-body">
          <client-only>
            <h3 class="media-item-date">
              {{
                new Date(props.mediaItem.attributes.date).toLocaleString(
                  "ru-RU",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )
              }}
            </h3>
          </client-only>
          <h3 class="media-item-title">
            {{ props.mediaItem.attributes.title }}
          </h3>
          <p class="media-item-content">
            {{ props.mediaItem.attributes.shortAbout }}
          </p>
        </div>
        <span class="media-item-link">
          {{ $t("Read more") }}
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 10L7.525 8.79167L10.6312 5.83333H0V4.16667H10.6312L7.525 1.20833L8.75 0L14 5L8.75 10Z"
              fill="#038DFF"
            />
          </svg>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>


<style lang="scss">
.media-item {
  background: #fff;
  padding: 60px 60px 80px 60px;
  width: 100%;
  position: relative;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  height: 490px;
  &-thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.2s ease;
  }
  &-header {
    font-size: 12px;
    font-weight: 400;
    color: #038dff;
    opacity: 1;
    margin-bottom: auto;
    z-index: 2;
    position: relative;
  }
  &-date {
    font-size: 24px;
    font-weight: 800;
    color: #212121;
    position: relative;
    z-index: 2;
    transition: color 0.1s ease;
  }
  &-title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 8px;
    margin-bottom: 10px;
    color: #212121;
    position: relative;
    z-index: 2;
    transition: color 0.1s ease;
  }
  &-content {
    font-size: 13px;
    font-weight: 300;
    color: #212121;
    line-height: 1.8;
    overflow: hidden;
    transition: opacity 0.2s ease;
    // transition: max-height .4s ease-in, opacity .2s ease
  }
  &-link {
    font-size: 15px;
    font-weight: 500;
    color: #038dff;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    position: relative;
    z-index: 2;
    transition: color 0.1s ease;
    svg {
      path {
        transition: fill 0.1s ease;
      }
    }
  }
}

.media-item:hover {
  .media-item-header {
    opacity: 0;
  }
  .media-item-title {
    color: #fff;
  }
  .media-item-date {
    color: #fff;
  }
  .media-item-link {
    color: #fff;
    svg {
      path {
        fill: #fff;
      }
    }
  }
  .media-item-content {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .media-item-thumb {
    opacity: 0.9;
    transition: opacity 0.4s ease;
  }
}

.media-item.no-image:hover {
  background-color: var(--accent-color);
  transition: background-color 0.3s ease;
}

.media-item.no-image:hover:before {
  display: none;
}

.media-item:hover:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>