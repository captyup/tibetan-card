<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height mx-auto" max-width="900">
            <v-carousel hide-delimiters :continuous="false">
                <v-carousel-item v-for="letter in letters" :key="i">
                    <v-sheet height="100%" tile>
                    
                            <div class="letter">
                                {{ letter }}
                            </div>
                      
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-responsive>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
function shuffle(array: string[]): string[] {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const letters = ref(shuffle([
    'ཀ','ཁ','ག','ང','ཅ', 'ཆ', 'ཇ', 'ཉ', 'ཏ', 'ཐ', 'ད', 'ན', 'པ', 'ཕ', 'བ', 'མ', 'ཙ', 'ཚ', 'ཛ', 'ཝ', 'ཞ', 'ཟ', 'འ', 'ཡ', 'ར', 'ལ', 'ཤ', 'ས', 'ཧ', 'ཨ'
]));
</script>
<style>
.letter {
    font-family: 'Monlam Uni OuChan2';
    font-size:20em;
    text-align: center;
}
</style>