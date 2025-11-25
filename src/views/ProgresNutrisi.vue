<script setup>
import { ref } from 'vue';

// --- DATA DUMMY ---

const measurements = ref([
  { week: 'Minggu 1', chest: 95.0, arm: 30.0, waist: 80.0, hips: 100.0, thigh: 60.0 },
  { week: 'Minggu 2', chest: 94.0, arm: 29.5, waist: 79.0, hips: 99.0, thigh: 59.5 },
  { week: 'Minggu 3', chest: 93.5, arm: 29.0, waist: 78.0, hips: 98.5, thigh: 59.0 },
  { week: 'Minggu 4', chest: 93.0, arm: 28.5, waist: 77.5, hips: 98.0, thigh: 58.5 },
]);

// Kalori: Pastikan angka cukup besar agar bar terlihat
const calorieData = [
  { day: 'Sen', intake: 70, burn: 60 },
  { day: 'Sel', intake: 60, burn: 80, isTarget: true, label: '1,755 kcal' },
  { day: 'Rab', intake: 90, burn: 75 },
  { day: 'Kam', intake: 80, burn: 50 },
];

// Tidur: Segmen dalam persen (Total jangan lebih dari 100 untuk visual yang baik)
const sleepData = [
  { day: 'Mgg', awake: 10, rem: 20, light: 30, deep: 40, label: '6j 45m' },
  { day: 'Sen', awake: 10, rem: 25, light: 35, deep: 30, label: '7j 25m' },
  { day: 'Sel', awake: 5, rem: 30, light: 30, deep: 35, label: '7j 55m' },
  { day: 'Rab', awake: 15, rem: 20, light: 35, deep: 30, label: '6j 0m' },
  { day: 'Kam', awake: 10, rem: 25, light: 35, deep: 30, label: '6j 50m' },
];

const hydrationData = [
  { day: 'Sen', percent: 60, label: '100%', vol: '2.0 L' },
  { day: 'Sel', percent: 40, label: '90%', vol: '1.8 L' },
  { day: 'Rab', percent: 75, label: '110%', vol: '2.2 L' },
  { day: 'Kam', percent: 30, label: '80%', vol: '1.6 L' },
  { day: 'Jum', percent: 60, label: '100%', vol: '2.0 L' },
  { day: 'Sab', percent: 55, label: '95%', vol: '1.9 L' },
  { day: 'Mgg', percent: 85, label: '105%', vol: '2.1 L', isToday: true },
];
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FD] p-8 font-sans text-gray-700">
    <h1 class="text-2xl font-bold mb-8 text-gray-800">Progress Nutrition</h1>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      
      <div class="xl:col-span-8 flex flex-col gap-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div class="lg:col-span-3 bg-white rounded-[2rem] p-0 relative min-h-[600px] overflow-hidden shadow-sm">
             <div class="absolute top-8 left-8 z-10">
                <button class="bg-[#FFC700] text-xs font-bold px-4 py-2 rounded-full">Hari Ini v</button>
             </div>
             
             <div class="w-full h-full flex justify-center items-center pt-10">
                 <img src="/body-model.png" alt="Body Model" class="h-[500px] object-contain opacity-80 z-0" />
             </div>

             <div class="absolute top-[30%] right-[5%] flex items-center w-[45%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="ml-2 text-right min-w-[80px]">
                    <p class="text-xs text-gray-400">Dada</p>
                    <p class="font-bold text-lg leading-none">93.0 <span class="text-xs font-normal">cm</span></p>
                </div>
             </div>

             <div class="absolute top-[40%] right-[10%] flex items-center w-[40%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="ml-2 text-right min-w-[80px]">
                    <p class="text-xs text-gray-400">Pinggang</p>
                    <p class="font-bold text-lg leading-none">77.5 <span class="text-xs font-normal">cm</span></p>
                </div>
             </div>

             <div class="absolute top-[55%] right-[12%] flex items-center w-[35%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="ml-2 text-right min-w-[80px]">
                    <p class="text-xs text-gray-400">Paha</p>
                    <p class="font-bold text-lg leading-none">58.5 <span class="text-xs font-normal">cm</span></p>
                </div>
             </div>

             <div class="absolute top-[34%] left-[8%] flex items-center flex-row-reverse w-[35%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative">
                    <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="mr-2 text-left min-w-[80px]">
                    <p class="text-xs text-gray-400">Lengan</p>
                    <p class="font-bold text-lg leading-none">28.5 <span class="text-xs font-normal">cm</span></p>
                </div>
             </div>

             <div class="absolute top-[45%] left-[10%] flex items-center flex-row-reverse w-[40%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative">
                    <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="mr-2 text-left min-w-[80px]">
                    <p class="text-xs text-gray-400">Panggul</p>
                    <p class="font-bold text-lg leading-none">98.0 <span class="text-xs font-normal">cm</span></p>
                </div>
             </div>
          </div>

          <div class="lg:col-span-2 flex flex-col gap-8">
            <div class="bg-[#FFF8ED] rounded-[2rem] p-8 shadow-sm relative">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold">Pelacak Berat Badan</h3>
                    <span class="text-gray-400 text-xl">...</span>
                </div>
                <div class="space-y-2 mb-4">
                    <div class="flex justify-between text-sm"><span class="text-gray-500">Berat Awal</span><span class="font-bold">85 Kg</span></div>
                    <div class="flex justify-between text-sm"><span class="text-gray-500">Berat Sekarang</span><span class="font-bold">78 Kg</span></div>
                    <div class="flex justify-between text-sm"><span class="text-gray-500">Target</span><span class="font-bold">65 Kg</span></div>
                </div>
                <div class="h-32 w-full relative">
                    <svg class="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                         <path d="M0,80 C80,75 150,90 220,60 L300,50 L300,100 L0,100 Z" fill="#FDE68A" opacity="0.3" />
                         <path d="M0,80 C80,75 150,90 220,60 L300,50" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
                        <circle cx="220" cy="60" r="5" fill="#F59E0B" stroke="white" stroke-width="2" />
                    </svg>
                    <div class="absolute top-[40%] left-[65%] bg-white text-[10px] font-bold px-2 py-1 rounded shadow text-orange-500">73 kg</div>
                </div>
                <div class="flex justify-between text-[10px] text-gray-400 mt-2">
                    <span>Apr</span><span>Mei</span><span>Jun</span><span>Jul</span><span>Ags</span><span>Sep</span>
                </div>
            </div>

            <div class="bg-white rounded-[2rem] p-8 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold">Foto Progres</h3>
                    <button class="bg-[#FFC700] text-[10px] px-3 py-1 rounded-full font-bold">View All</button>
                </div>
                <div class="flex gap-3">
                    <div class="flex-1">
                        <p class="text-[10px] text-gray-500 mb-1">Juli 2025</p>
                        <div class="bg-gray-200 h-32 rounded-xl relative overflow-hidden">
                             <div class="absolute bottom-1 left-1 bg-white/80 px-2 py-0.5 rounded text-[10px] font-bold">82 Kg</div>
                             <img src="/person1.png" class="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                    <div class="flex-1">
                        <p class="text-[10px] text-gray-500 mb-1">Sept 2025</p>
                        <div class="bg-gray-200 h-32 rounded-xl overflow-hidden">
                             <img src="/person1.png" class="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div class="bg-[#FFF8ED] rounded-[2rem] p-8 shadow-sm">
             <div class="mb-4"><button class="bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">September 2025 v</button></div>
             <table class="w-full text-sm text-left border-separate border-spacing-y-2">
                 <thead>
                     <tr class="text-gray-400 text-xs">
                         <th class="py-2 pl-4 font-normal">Minggu</th>
                         <th class="py-2 font-normal">Dada (cm)</th>
                         <th class="py-2 font-normal">Lengan (cm)</th>
                         <th class="py-2 font-normal">Pinggang (cm)</th>
                         <th class="py-2 font-normal">Panggul (cm)</th>
                         <th class="py-2 pr-4 font-normal">Paha (cm)</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="m in measurements" :key="m.week" class="bg-white shadow-sm rounded-lg">
                         <td class="py-4 pl-4 rounded-l-lg text-gray-500 font-medium">{{ m.week }}</td>
                         <td class="py-4 font-bold">{{ m.chest }}</td>
                         <td class="py-4 font-bold">{{ m.arm }}</td>
                         <td class="py-4 font-bold">{{ m.waist }}</td>
                         <td class="py-4 font-bold">{{ m.hips }}</td>
                         <td class="py-4 pr-4 rounded-r-lg font-bold">{{ m.thigh }}</td>
                     </tr>
                 </tbody>
             </table>
        </div>
      </div>
      
      <div class="xl:col-span-4 flex flex-col gap-8">
        
        <div class="bg-white rounded-[2rem] p-8 shadow-sm h-[400px] flex flex-col">
            <div class="flex justify-between mb-2">
                <h3 class="font-bold">Aktivitas Kalori</h3>
                <button class="bg-[#FFC700] text-[10px] font-bold px-2 py-1 rounded-full h-fit">4 Hari Terakhir v</button>
            </div>
            
            <div class="mb-6 relative">
                <h2 class="text-3xl font-bold">450 <span class="text-sm font-normal text-gray-400">kcal tersisa</span></h2>
                <p class="text-[10px] text-gray-400">Target Kalori: 2,000 kcal</p>
                <div class="absolute top-0 right-0 text-[10px] space-y-1">
                    <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-[#FFC700]"></div> Dikonsumsi</div>
                    <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-orange-400"></div> Dibakar</div>
                </div>
            </div>

            <div class="flex flex-grow gap-2">
                 <div class="flex flex-col justify-between h-full text-[10px] text-gray-300 pb-6 text-right w-8">
                     <span>2000</span><span>1500</span><span>1000</span><span>500</span><span>0</span>
                 </div>
                 <div class="flex justify-between items-end w-full pb-6 h-full relative">
                     <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                         <div class="border-b border-dashed border-gray-100 h-full w-full"></div>
                     </div>
                     
                     <div v-for="d in calorieData" :key="d.day" class="flex flex-col justify-end items-center h-full w-1/4 relative group">
                         <div v-if="d.isTarget" class="absolute top-[20%] bg-white border shadow text-[10px] font-bold px-2 py-1 rounded mb-1 z-10 whitespace-nowrap">
                             {{ d.label }}
                         </div>
                         <div class="flex gap-1 items-end h-full w-full justify-center">
                             <div class="w-3 bg-[#FFC700] rounded-t-md transition-all hover:bg-yellow-300" :style="{ height: d.intake + '%' }"></div>
                             <div class="w-3 bg-orange-400 rounded-t-md transition-all hover:bg-orange-300" :style="{ height: d.burn + '%' }"></div>
                         </div>
                         <span class="text-[10px] text-gray-400 mt-2">{{ d.day }}</span>
                     </div>
                 </div>
            </div>
        </div>

        <div class="bg-white rounded-[2rem] p-8 shadow-sm h-[420px] flex flex-col">
            <div class="flex justify-between mb-4">
                <h3 class="font-bold">Statistik Tidur</h3>
                <button class="bg-[#FFC700] text-[10px] font-bold px-2 py-1 rounded-full h-fit">5 Hari Terakhir v</button>
            </div>
            <div class="flex gap-3 flex-wrap text-[9px] text-gray-500 mb-4">
                 <div class="flex items-center gap-1"><div class="w-2 h-1 bg-orange-400 rounded-full"></div> T. Nyenyak</div>
                 <div class="flex items-center gap-1"><div class="w-2 h-1 bg-[#FFC700] rounded-full"></div> T. Ringan</div>
                 <div class="flex items-center gap-1"><div class="w-2 h-1 bg-[#FDE68A] rounded-full"></div> REM</div>
                 <div class="flex items-center gap-1"><div class="w-2 h-1 bg-gray-200 rounded-full"></div> Terbangun</div>
            </div>

            <div class="flex flex-grow gap-2">
                 <div class="flex flex-col justify-between h-full text-[9px] text-gray-300 pb-8 text-right w-10">
                     <span>9PM</span><span>11PM</span><span>1AM</span><span>3AM</span><span>5AM</span>
                 </div>
                 <div class="flex justify-between items-end w-full pb-2 h-full">
                     <div v-for="s in sleepData" :key="s.day" class="flex flex-col items-center w-full h-full justify-end">
                         <div class="w-5 flex flex-col gap-[2px] h-[80%] justify-end">
                             <div class="bg-gray-200 w-full rounded-sm" :style="{ height: s.awake + '%' }"></div>
                             <div class="bg-[#FDE68A] w-full rounded-sm" :style="{ height: s.rem + '%' }"></div>
                             <div class="bg-[#FFC700] w-full rounded-sm" :style="{ height: s.light + '%' }"></div>
                             <div class="bg-orange-400 w-full rounded-sm" :style="{ height: s.deep + '%' }"></div>
                         </div>
                         <div class="text-center mt-2">
                             <p class="text-[9px] font-bold text-gray-600">{{ s.label }}</p>
                             <p class="text-[9px] text-gray-400">{{ s.day }}</p>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        <div class="bg-white rounded-[2rem] p-8 shadow-sm">
            <div class="flex justify-between mb-6">
                <h3 class="font-bold">Hidrasi</h3>
                <button class="bg-[#FFC700] text-[10px] font-bold px-2 py-1 rounded-full h-fit">Minggu Ini v</button>
            </div>
            <div class="flex gap-6 mb-8">
                 <div class="flex items-center gap-2">
                     <div class="bg-green-50 p-2 rounded-full text-green-500"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v5.59l3.52-3.52a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.94 5.94a.75.75 0 111.06-1.06l3.52 3.52V2.75A.75.75 0 0110 2z"/></svg></div>
                     <div><p class="text-[10px] text-gray-400">Level</p><p class="font-bold">Normal</p></div>
                 </div>
                 <div class="flex items-center gap-2">
                     <div class="bg-orange-50 p-2 rounded-full text-orange-500"><div class="w-4 h-4 border-2 border-current rounded-b-md"></div></div>
                     <div><p class="text-[10px] text-gray-400">Asupan</p><p class="font-bold">2.0 L</p></div>
                 </div>
            </div>

            <div class="flex justify-between items-end h-32 relative pt-6">
                 <div class="absolute top-[50%] w-full border-b border-dashed border-gray-200"></div>
                 <div v-for="h in hydrationData" :key="h.day" class="flex flex-col items-center w-full relative group">
                      <div class="absolute -top-6 text-[9px] font-bold bg-white px-1 shadow-sm rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{{ h.label }}</div>
                      
                      <div class="w-2 bg-orange-50 rounded-full overflow-hidden relative" :class="h.isToday ? 'h-24 w-3 shadow-md' : 'h-20'">
                          <div class="absolute bottom-0 w-full bg-[#FFC700] rounded-full transition-all duration-500" :style="{ height: h.percent + '%' }"></div>
                      </div>
                      <div class="mt-2 text-center">
                          <p class="text-[9px] font-bold text-gray-700">{{ h.vol }}</p>
                          <p class="text-[9px] text-gray-400" :class="{'text-orange-500 font-bold': h.isToday}">{{ h.day }}</p>
                      </div>
                 </div>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar halus */
::-webkit-scrollbar { height: 4px; width: 4px; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>