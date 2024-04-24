<template>
    <v-container class="fill-height">
        <v-responsive class="align-center fill-height mx-auto" max-width="900">
            <v-carousel hide-delimiters :continuous="false" v-model="selectedCard">
                <v-carousel-item v-for="letter in letters" :key="letter" :value="letter">
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
import { ref,reactive } from 'vue'
import { useAppStore } from '@/stores/app';
const app = useAppStore()
const selectedCard = ref('');
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
const cardsets = new Map([
    ["cardset-01","ཀ།ཁ།ག།ང།ཙ།ཚ།ཛ།ཝ།ཅ།ཆ།ཇ།ཉ།ཞ།ཟ།འ།ཡ།ཏ།ཐ།ད།ན།ར།ལ།ཤ།ས།པ།ཕ།བ།མ།ཧ།ཨ".split("།")],
    ["cardset-02","ཀི།ཀུ།ཀེ།ཀོ།ཅི།ཅུ།ཅེ།ཅོ།ཏི།ཏུ།ཏེ།ཏོ།པི།པུ།པེ།པོ།ཙི།ཙུ།ཙེ།ཙོ།ཞི།ཞུ།ཞེ།ཞོ།རི།རུ།རེ།རོ།ཧི།ཧུ།ཧེ།ཧོ།ཁི།ཁུ།ཁེ།ཁོ།ཆི།ཆུ།ཆེ།ཆོ།ཐི།ཐུ།ཐེ།ཐོ།ཕི།ཕུ།ཕེ།ཕོ།ཚི།ཚུ།ཚེ།ཚོ།ཟི།ཟུ།ཟེ།ཟོ།ལི།ལུ།ལེ།ལོ།ཨི།ཨུ།ཨེ།ཨོ།གི།གུ།གེ།གོ།ཇི།ཇུ།ཇེ།ཇོ།དི།དུ།དེ།དོ།བི།བུ།བེ།བོ།ཛི།ཛུ།ཛེ།ཛོ།འི།འུ།འེ།འོ།ཤི།ཤུ།ཤེ།ཤོ།ངི།ངུ།ངེ།ངོ།ཉི།ཉུ།ཉེ།ཉོ།ནི།ནུ།ནེ།ནོ།མི།མུ།མེ།མོ།ཝི།ཝུ།ཝེ།ཝོ།ཡི།ཡུ།ཡེ།ཡོ།སི།སུ།སེ།སོ།".split("།")]
])

const letters = ref(shuffle(app.selected.flatMap(it=>cardsets.get(it))));
if(letters.value.length>0){
    selectedCard.value = letters.value[0];
}

app.$subscribe((mutation, state) => {
    letters.value = shuffle(state.selected.flatMap(it=>cardsets.get(it)))
    if(letters.value.length>0){
        selectedCard.value = letters.value[0];
    }
});
</script>
<style>
.letter {
    font-family: 'Monlam Uni OuChan2';
    font-size:20em;
    text-align: center;
}
</style>