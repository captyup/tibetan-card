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
import { ref } from 'vue'
import { useAppStore } from '@/stores/app';
import { forEachChild } from 'typescript';
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
    ["cardset-02","ཀི།ཀུ།ཀེ།ཀོ།ཅི།ཅུ།ཅེ།ཅོ།ཏི།ཏུ།ཏེ།ཏོ།པི།པུ།པེ།པོ།ཙི།ཙུ།ཙེ།ཙོ།ཞི།ཞུ།ཞེ།ཞོ།རི།རུ།རེ།རོ།ཧི།ཧུ།ཧེ།ཧོ།ཁི།ཁུ།ཁེ།ཁོ།ཆི།ཆུ།ཆེ།ཆོ།ཐི།ཐུ།ཐེ།ཐོ།ཕི།ཕུ།ཕེ།ཕོ།ཚི།ཚུ།ཚེ།ཚོ།ཟི།ཟུ།ཟེ།ཟོ།ལི།ལུ།ལེ།ལོ།ཨི།ཨུ།ཨེ།ཨོ།གི།གུ།གེ།གོ།ཇི།ཇུ།ཇེ།ཇོ།དི།དུ།དེ།དོ།བི།བུ།བེ།བོ།ཛི།ཛུ།ཛེ།ཛོ།འི།འུ།འེ།འོ།ཤི།ཤུ།ཤེ།ཤོ།ངི།ངུ།ངེ།ངོ།ཉི།ཉུ།ཉེ།ཉོ།ནི།ནུ།ནེ།ནོ།མི།མུ།མེ།མོ།ཝི།ཝུ།ཝེ།ཝོ།ཡི།ཡུ།ཡེ།ཡོ།སི།སུ།སེ།སོ།".split("།")],
    ["cardset-03","ཀྱི།ཀྱུ།ཀྱེ།ཀྱོ།པྱི།པྱུ།པྱེ།པྱོ།ཁྱི།ཁྱུ།ཁྱེ།ཁྱོ།ཕྱི།ཕྱུ།ཕྱེ།ཕྱོ།གྱི།གྱུ།གྱེ།གྱོ།བྱི།བྱུ།བྱེ།བྱོ།མྱི།མྱུ།མྱེ།མྱོ།ཀྲི།ཀྲུ།ཀྲེ།ཀྲོ།ཏྲི།ཏྲུ།ཏྲེ།ཏྲོ།པྲི།པྲུ།པྲེ།པྲོ།མྲི།མྲུ།མྲེ།མྲོ།ཧྲི།ཧྲུ།ཧྲེ།ཧྲོ།ཁྲི།ཁྲུ།ཁྲེ།ཁྲོ།ཐྲི།ཐྲུ།ཐྲེ།ཐྲོ།ཕྲི།ཕྲུ།ཕྲེ།ཕྲོ།སྲི།སྲུ།སྲེ།སྲོ།གྲི།གྲུ།གྲེ།གྲོ།དྲི།དྲུ།དྲེ།དྲོ།བྲི།བྲུ།བྲེ།བྲོ།ཀླི།ཀླུ།ཀླེ།ཀློ།རླི།རླུ།རླེ།རློ།གླི།གླུ།གླེ།གློ།སླི།སླུ།སླེ།སློ།བླི།བླུ།བླེ།བློ།ཟླི།ཟླུ།ཟླེ།ཟློ".split("།")],
    ["cardset-04","རྐི།རྐུ།རྐེ།རྐོ།རྙི།རྙུ།རྙེ།རྙོ།རྦི།རྦུ།རྦེ།རྦོ།རྒི།རྒུ།རྒེ།རྒོ།རྟི།རྟུ།རྟེ།རྟོ།རྨི།རྨུ།རྨེ།རྨོ།རྔི།རྔུ།རྔེ།རྔོ།རྡི།རྡུ།རྡེ།རྡོ།རྩི།རྩུ།རྩེ།རྩོ།རྗི།རྗུ།རྗེ།རྗོ།རྣི།རྣུ།རྣེ།རྣོ།རྫི།རྫུ།རྫེ།རྫོ།ལྐི།ལྐུ།ལྐེ།ལྐོ།ལྗི།ལྗུ།ལྗེ།ལྗོ།ལྦི།ལྦུ།ལྦེ།ལྦོ།ལྒི།ལྒུ།ལྒེ།ལྒོ།ལྟི།ལྟུ།ལྟེ།ལྟོ།ལྷི།ལྷུ།ལྷེ།ལྷོ།ལྔི།ལྔུ།ལྔེ།ལྔོ།ལྡི།ལྡུ།ལྡེ།ལྡོ།ལྕི།ལྕུ།ལྕེ།ལྕོ།ལྤི།ལྤུ།ལྤེ།ལྤོ།སྐི།སྐུ།སྐེ།སྐོ།སྟི།སྟུ།སྟེ།སྟོ།སྦི།སྦུ།སྦེ།སྦོ།སྒི།སྒུ།སྒེ།སྒོ།སྡི།སྡུ།སྡེ།སྡོ།སྨི།སྨུ།སྨེ།སྨོ།སྔི།སྔུ།སྔེ།སྔོ།སྣི།སྣུ།སྣེ།སྣོ།སྩི།སྩུ།སྩེ།སྩོ།སྙི།སྙུ།སྙེ།སྙོ།སྤི།སྤུ།སྤེ།སྤོ".split("།")],
    ["cardset-05","རྐྱི།རྐྱུ།རྐྱེ།རྐྱོ།སྐྱི།སྐྱུ།སྐྱེ།སྐྱོ།སྨྱི།སྨྱུ།སྨྱེ།སྨྱོ།སྐྲི།སྐྲུ།སྐྲེ།སྐྲོ།སྨྲི།སྨྲུ།སྨྲེ།སྨྲོ།རྒྱི།རྒྱུ།རྒྱེ།རྒྱོ།སྒྱི།སྒྱུ།སྒྱེ།སྒྱོ།སྒྲི།སྒྲུ།སྒྲེ།སྒྲོ།རྨྱི།རྨྱུ།རྨྱེ།རྨྱོ།སྤྱི།སྤྱུ།སྤྱེ།སྤྱོ།སྤྲི།སྤྲུ།སྤྲེ།སྤྲོ།སྦྱི།སྦྱུ།སྦྱེ།སྦྱོ།སྦྲི།སྦྲུ།སྦྲེ།སྦྲོ".split("།")]
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