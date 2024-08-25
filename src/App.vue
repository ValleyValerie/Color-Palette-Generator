<template>
  <Header />
  <div>
    <div class="color-palette" v-if="colorPalette.length">
      <div 
        v-for="(color, index) in colorPalette" 
        :key="index" 
        class="color-block" 
        :style="{ backgroundColor: color.hex }"
        @click="handleColorBlockClick(index, color.rgb)"
        :class="{ 'selected': selectedColorIndex === index }">
        <div class="color-text">
          <span class="color-code">{{ color.rgb }}</span>
          <span class="color-name">{{ color.name }}</span>
        </div>
      </div>
      <div class="red-square-container" ref="imageContainer" :style="{ backgroundImage: `url(${currentImageSrc})` }">
        <div class="image-overlay"></div>
        <div class="red-square">
          <div class="file-upload-container">
            <label for="file-upload" class="custom-file-upload">Upload Image</label>
            <input id="file-upload" type="file" @change="handleFileChange" />
            <canvas ref="canvas" style="display:none;"></canvas>
          </div>
        </div>
        <div ref="debug"></div>
      </div>
    </div>
  </div>
</template>


<script>
import ColorThief from 'colorthief';
import defaultImageSrc from '@/assets/flowerss.jpeg'; 
import Header from './components/Header.vue';


export default {
  data() {
    return {
      colorPalette: [],
      selectedColorIndex: null,
      defaultImageSrc: defaultImageSrc,
      uploadedImageSrc: null
    };
  },
  components: {
    Header,
  },
  computed: {
    currentImageSrc() {
      return this.uploadedImageSrc || this.defaultImageSrc;
    }
  },
  mounted() {
    this.extractPalette(this.currentImageSrc);
    this.setBackgroundImage(this.currentImageSrc);
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImageSrc = e.target.result;
          this.extractPalette(this.currentImageSrc);
          this.setBackgroundImage(this.currentImageSrc);
        };
        reader.readAsDataURL(file);
      }
    },
    extractPalette(imageSrc) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageSrc;
      img.onload = () => {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 6);
        this.updateColorPalette(palette);
      };
    },
    updateColorPalette(palette) {
      this.colorPalette = palette.map(color => {
        const rgb = this.rgbToString(color);
        const hex = this.rgbToHex(color[0], color[1], color[2]);
        return {
          hex: hex,
          rgb: rgb,
          name: this.getColorName(hex)
        };
      });
    },
    rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    },
    rgbToString(colorArray) {
      return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
    },
    getColorName(hex) {
      return hex; 
    },
    setBackgroundImage(imageSrc) {
      const container = this.$refs.imageContainer;
      if (container) {
        container.style.backgroundImage = `url(${imageSrc})`;
        container.style.display = 'none';
        container.offsetHeight; 
        container.style.display = 'block';
      }
    },
    handleColorBlockClick(index, rgb) {
      this.selectedColorIndex = index;
      this.copyToClipboard(rgb);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert(`${text} copied to clipboard!`);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    },
  },
};
</script>

<style>
.color-palette {
  display: flex;
  justify-content: space-between;
  height: 90vh;
}

.color-block {
  width: 16.67vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10vh;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-block.selected {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.color-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: medium;
}

.color-code, .color-name {
  opacity: 1; 
  transition: opacity 0.3s ease;
}

.selected .color-code, .selected .color-name {
  opacity: 1;
}


.red-square-container {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 55vw;
  height: 55vh; 
  z-index: 10;
  background-color: rgb(0, 0, 0);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px; 
  overflow: hidden; 
  }

  .red-square {
    position: absolute;
    top: 50%;
    left: 30%;
    width: 15vw;
    background-color: rgba(255, 0, 0, 0.026);
    
  }

  .file-upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.custom-file-upload {
  display: inline-block;
  padding: 12px 24px;
  cursor: pointer;
  background-color: #000000a6; 
  color: white;
  font-size: 18px; 
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.1s;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Arial, sans-serif;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.578);
}

.custom-file-upload:hover {
  transform: translateY(-2px);
}

.custom-file-upload:active {
  transform: translateY(0);
}

input[type="file"] {
  display: none; 
}

</style>
