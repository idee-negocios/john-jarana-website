import Blazy from 'blazy';

function background() {
  let bLazy = new Blazy({
    offset: 200,
    success(el) {
    },
    error(el, msg) {
      console.log(msg);
    }
  });
}

function brands(options) {
  // Configuration
  const screenWidth = $(window).width();
  const imageWidth = 64;
  const imagesNumber = files.brandIcons.length;
  const imagesInScreen = Math.floor(screenWidth / imageWidth);

  // Utils
  const randomSort = _ => Math.random() < 0.5 ? -1 : 1;
  const randomItem = (arr) => {
    let index = Math.floor(Math.random() * arr.length);
    return [arr[index], index];
  };

  // Render
  const  brandsContainer = $('#brands');

  const renderImages = (brandIcons) => {
    brandsContainer.empty();

    brandIcons
      .forEach((icon, i) => {
        let brandIconEl = $(`<img class="brand" src="${icon.src}" alt="${icon.src}" />`);
        brandsContainer.append(brandIconEl);

        icon.used = true;
      });
  };

  // Get random brandIcons
  let brandIcons = files.brandIcons
      .map((b, i) => {
        return {
          used: false,
          src: `${assets.icons}/brands/${b}`
        };
      })
      .sort(randomSort);

  let usedIcons = brandIcons.slice(0, imagesInScreen);
  let unusedIcons = brandIcons.slice(imagesInScreen, brandIcons.length);

  renderImages(usedIcons);

  if(imagesInScreen < imagesNumber) {
    setInterval(_ => {
      let [unusedIcon, unusedIconIndex] = randomItem(unusedIcons);
      let [usedIcon, usedIconIndex] = randomItem(usedIcons);

      unusedIcon.used = true;
      usedIcons[usedIconIndex] = unusedIcon;

      usedIcon.used = false;
      unusedIcons[unusedIconIndex] = usedIcon;

      renderImages(usedIcons);
    }, options.timeOut);
  }

}

export function init() {
  background();

  brands({
    timeOut: 5000
  });
}
