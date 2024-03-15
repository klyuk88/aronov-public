export const usePageSingleNavNext = (index, list, category) => {
    if (index < list.value.data.length - 1) {
        list.value.data.forEach((item, idx) => {
            if (index + 1 === idx) {
                return navigateTo(`/${category}/${item.attributes.slug}`);
            }
        });
    }
}
export const usePageSingleNavPrev = (index, list, category) => {
    if (index > 0) {
        list.value.data.forEach((item, idx) => {
            if (index - 1 === idx) {
                return navigateTo(`/${category}/${item.attributes.slug}`);
            }
        });
    }
}