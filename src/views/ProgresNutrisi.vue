<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '../stores/userStore';

// --- 1. DATA DARI USER STORE ---
const userStore = useUserStore();

const userData = computed(() => {
  return {
    weight: Number(userStore.weight) || 60,
    height: Number(userStore.height) || 165,
    birthDate: userStore.birthDate || '2000-01-01',
    gender: userStore.gender || 'male',
    activityLevel: Number(userStore.activityLevel) || 1.2
  };
});

// --- 2. LOGIKA PERHITUNGAN ---

// Umur
const age = computed(() => {
  const today = new Date();
  const birth = new Date(userData.value.birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
});

// BMI
const bmi = computed(() => {
  const h = userData.value.height / 100;
  if (h <= 0) return "0.0";
  return (userData.value.weight / (h * h)).toFixed(1);
});

// Status BMI
const bmiStatus = computed(() => {
  const val = parseFloat(bmi.value);
  if (val < 18.5) return { label: 'Kurus (Underweight)', risk: 'Rendah (Risiko Defisiensi)', text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500', desc: 'Tingkatkan asupan kalori padat gizi dan protein.' };
  if (val >= 18.5 && val < 24.9) return { label: 'Normal', risk: 'Rata-rata (Sehat)', text: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500', desc: 'Pertahankan pola makan dan aktivitas fisik saat ini.' };
  if (val >= 25 && val < 29.9) return { label: 'Gemuk (Overweight)', risk: 'Meningkat', text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500', desc: 'Disarankan defisit kalori ringan dan olahraga rutin.' };
  return { label: 'Obesitas', risk: 'Tinggi', text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500', desc: 'Konsultasikan diet ketat dan hindari gula/lemak jenuh.' };
});

// Berat Ideal
const idealWeight = computed(() => {
  const h = userData.value.height / 100;
  const min = (18.5 * h * h).toFixed(0);
  const max = (24.9 * h * h).toFixed(0);
  return `${min} - ${max} Kg`;
});

// Target Kalori (BMR + Aktivitas)
const dailyTarget = computed(() => {
  let bmr = (10 * userData.value.weight) + (6.25 * userData.value.height) - (5 * age.value);
  bmr += userData.value.gender === 'male' ? 5 : -161;
  return Math.round(bmr * userData.value.activityLevel);
});


// --- 3. UI LOGIC ---
const activeDropdown = ref('');
const dropdownData = {
  body: ['Hari Ini', 'Kemarin', '7 Hari Lalu'],
  calorie: ['Minggu Ini', 'Bulan Ini']
};
const selected = ref({ body: 'Hari Ini', calorie: 'Minggu Ini' });

const toggleDropdown = (name) => activeDropdown.value = activeDropdown.value === name ? '' : name;
const selectOption = (type, val) => {
  selected.value[type] = val;
  activeDropdown.value = '';
};
const closeOnClickOutside = (e) => {
  if (!e.target.closest('.dropdown-container')) activeDropdown.value = '';
};

onMounted(() => window.addEventListener('click', closeOnClickOutside));
onBeforeUnmount(() => window.removeEventListener('click', closeOnClickOutside));


// --- 4. DATA DUMMY GRAFIK (DIPERBAIKI AGAR LEBIH DINAMIS) ---
const measurements = ref([
  { week: 'Minggu 1', chest: 95.0, arm: 30.0, waist: 80.0, hips: 100.0, thigh: 60.0 },
  { week: 'Minggu 2', chest: 94.0, arm: 29.5, waist: 79.0, hips: 99.0, thigh: 59.5 },
  { week: 'Minggu 3', chest: 93.5, arm: 29.0, waist: 78.0, hips: 98.5, thigh: 59.0 },
  { week: 'Minggu 4', chest: 93.0, arm: 28.5, waist: 77.5, hips: 98.0, thigh: 58.5 },
]);

// DATA KALORI YANG LEBIH BERVARIASI
const calorieData = [
  { day: 'Sen', intake: 2300, burn: 300 }, // Intake tinggi, burn rendah (Gap jauh)
  { day: 'Sel', intake: 1900, burn: 900, isTarget: true, label: 'Hebat!' }, // Olahraga keras (Batang terlihat lebih dekat)
  { day: 'Rab', intake: 2600, burn: 200 }, // Cheat day (Gap sangat jauh)
  { day: 'Kam', intake: 1700, burn: 500 }, // Diet ketat (Intake rendah)
];
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FD] p-8 font-sans text-gray-700">
    <h1 class="text-2xl font-bold mb-8 text-gray-800">Progress Nutrition</h1>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      
      <div class="xl:col-span-8 flex flex-col gap-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div class="lg:col-span-3 bg-white rounded-[2rem] p-0 relative min-h-[600px] overflow-hidden shadow-sm">
             <div class="absolute top-8 left-8 z-20 dropdown-container">
                <button @click.stop="toggleDropdown('body')" class="bg-[#FFC700] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-400 transition shadow-sm">
                  {{ selected.body }}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3 transition-transform" :class="activeDropdown === 'body' ? 'rotate-180' : ''"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div v-if="activeDropdown === 'body'" class="absolute top-10 left-0 mt-2 w-40 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                   <div v-for="opt in dropdownData.body" :key="opt" @click="selectOption('body', opt)" class="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer">{{ opt }}</div>
                </div>
             </div>
             <div class="w-full h-full flex justify-center items-center pt-10">
                 <img src="/body-model.png" alt="Body Model" class="h-[500px] object-contain opacity-80 z-0" />
             </div>
             <div class="absolute top-[30%] right-[5%] flex items-center w-[45%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative"><div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div></div>
                <div class="ml-2 text-right min-w-[80px]"><p class="text-xs text-gray-400">Dada</p><p class="font-bold text-lg">93.0 <span class="text-xs">cm</span></p></div>
             </div>
             <div class="absolute top-[40%] right-[10%] flex items-center w-[40%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative"><div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div></div>
                <div class="ml-2 text-right min-w-[80px]"><p class="text-xs text-gray-400">Pinggang</p><p class="font-bold text-lg">77.5 <span class="text-xs">cm</span></p></div>
             </div>
             <div class="absolute top-[55%] right-[12%] flex items-center w-[35%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative"><div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div></div>
                <div class="ml-2 text-right min-w-[80px]"><p class="text-xs text-gray-400">Paha</p><p class="font-bold text-lg">58.5 <span class="text-xs">cm</span></p></div>
             </div>
             <div class="absolute top-[34%] left-[8%] flex items-center flex-row-reverse w-[35%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative"><div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div></div>
                <div class="mr-2 text-left min-w-[80px]"><p class="text-xs text-gray-400">Lengan</p><p class="font-bold text-lg">28.5 <span class="text-xs">cm</span></p></div>
             </div>
             <div class="absolute top-[45%] left-[10%] flex items-center flex-row-reverse w-[40%]">
                <div class="flex-grow h-[1px] bg-orange-400 relative"><div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div></div>
                <div class="mr-2 text-left min-w-[80px]"><p class="text-xs text-gray-400">Panggul</p><p class="font-bold text-lg">98.0 <span class="text-xs">cm</span></p></div>
             </div>
          </div>

          <div class="lg:col-span-2 flex flex-col gap-8">
            <div class="bg-[#FFF8ED] rounded-[2rem] p-8 shadow-sm relative">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold text-gray-800">Berat Badan</h3>
                    <span class="text-gray-400 text-xl">...</span>
                </div>
                <div class="space-y-2 mb-4">
                    <div class="flex justify-between text-sm"><span class="text-gray-500">Saat Ini</span><span class="font-bold text-xl">{{ userData.weight }} Kg</span></div>
                    <div class="flex justify-between text-sm"><span class="text-gray-500">Tinggi</span><span class="font-bold text-xl">{{ userData.height }} cm</span></div>
                </div>
                <div class="h-32 w-full relative">
                    <svg class="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                         <path d="M0,80 C80,90 150,70 220,60 L300,55 L300,100 L0,100 Z" fill="#FDE68A" opacity="0.4" />
                         <path d="M0,80 C80,90 150,70 220,60 L300,55" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
                        <circle cx="220" cy="60" r="5" fill="#F59E0B" stroke="white" stroke-width="2" />
                    </svg>
                    <div class="absolute top-[40%] left-[60%] bg-white text-[10px] font-bold px-2 py-1 rounded shadow text-orange-500 border border-orange-100">{{ userData.weight }} kg</div>
                </div>
            </div>

            <div class="bg-white rounded-[2rem] p-8 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-800">Foto Progres</h3>
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
             <div class="mb-4"><button class="bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm text-gray-600">September 2025 v</button></div>
             <table class="w-full text-sm text-left border-separate border-spacing-y-2">
                 <thead>
                     <tr class="text-gray-400 text-xs">
                         <th class="py-2 pl-4">Minggu</th>
                         <th class="py-2">Dada</th>
                         <th class="py-2">Lengan</th>
                         <th class="py-2">Pinggang</th>
                         <th class="py-2">Panggul</th>
                         <th class="py-2 pr-4">Paha</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="m in measurements" :key="m.week" class="bg-white shadow-sm rounded-lg">
                         <td class="py-4 pl-4 rounded-l-lg text-gray-500">{{ m.week }}</td>
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
        
        <div class="bg-white rounded-[2rem] p-8 shadow-sm relative z-30">
            <div class="flex justify-between mb-2 items-center">
                <h3 class="font-bold text-gray-800">Aktivitas Kalori</h3>
                <div class="relative dropdown-container">
                  <button @click.stop="toggleDropdown('calorie')" class="bg-[#FFC700] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-yellow-400 transition shadow-sm">
                    {{ selected.calorie }}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 transition-transform" :class="activeDropdown === 'calorie' ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div v-if="activeDropdown === 'calorie'" class="absolute top-8 right-0 w-36 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                     <div v-for="opt in dropdownData.calorie" :key="opt" @click="selectOption('calorie', opt)" class="px-3 py-1.5 text-[10px] hover:bg-gray-50 cursor-pointer">{{ opt }}</div>
                  </div>
                </div>
            </div>
            
            <div class="mb-8 relative">
                <h2 class="text-3xl font-extrabold text-gray-800">{{ dailyTarget }} <span class="text-sm font-normal text-gray-400 ml-1">kkal/hari</span></h2>
                <p class="text-[10px] text-gray-400 font-medium">Target (BMR x Aktivitas)</p>
            </div>

            <div class="flex flex-grow gap-3 h-48">
                 <div class="flex flex-col justify-between h-full text-[10px] text-gray-300 pb-6 text-right w-8 font-medium">
                     <span>{{ dailyTarget + 500 }}</span>
                     <span>{{ dailyTarget }}</span>
                     <span>{{ Math.round(dailyTarget/2) }}</span>
                     <span>0</span>
                 </div>
                 <div class="flex justify-between items-end w-full pb-6 h-full relative border-l border-dashed border-gray-200 pl-4">
                     <div class="absolute top-[35%] w-full border-t border-dashed border-green-200 z-0"></div>
                     
                     <div v-for="d in calorieData" :key="d.day" class="flex flex-col justify-end items-center h-full w-1/4 relative group z-10">
                         <div v-if="d.isTarget" class="absolute top-[15%] bg-orange-100 border border-orange-200 shadow-sm text-[10px] font-bold px-2 py-1 rounded mb-1 z-20 whitespace-nowrap text-orange-600">
                             {{ d.label }}
                         </div>
                         <div class="flex gap-1.5 items-end h-full w-full justify-center">
                             <div class="w-3 bg-[#FFC700] rounded-t-lg transition-all hover:bg-yellow-300 shadow-sm" :style="{ height: (d.intake / (dailyTarget + 500) * 100) + '%' }"></div>
                             <div class="w-3 bg-orange-400 rounded-t-lg transition-all hover:bg-orange-300 shadow-sm" :style="{ height: (d.burn / (dailyTarget + 500) * 100) + '%' }"></div>
                         </div>
                         <span class="text-[10px] text-gray-400 mt-3 font-medium">{{ d.day }}</span>
                     </div>
                 </div>
            </div>
            <div class="flex justify-center gap-6 text-[10px] text-gray-500 font-medium mt-2">
                <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-[#FFC700]"></div> Masuk</div>
                <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Keluar (Aktivitas)</div>
            </div>
        </div>

        <div class="bg-white rounded-[2rem] p-8 shadow-sm relative z-20 flex flex-col items-center">
            <h3 class="font-bold text-gray-800 self-start mb-6 w-full flex justify-between">
                Indeks Massa Tubuh
                <span class="text-xs font-normal text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">BMI</span>
            </h3>
            
            <div class="relative w-44 h-44 flex flex-col items-center justify-center rounded-full border-[10px] transition-colors duration-500 bg-gray-50" :class="bmiStatus.border">
                <span class="text-5xl font-black text-gray-800 tracking-tight">{{ bmi }}</span>
                <span class="text-xs uppercase tracking-widest font-bold mt-1 text-gray-400">Score</span>
            </div>

            <div class="mt-6 px-6 py-2 rounded-full text-sm font-bold shadow-md text-white transition-colors duration-500" :class="bmiStatus.bg">
                {{ bmiStatus.label }}
            </div>

            <p class="text-center text-xs text-gray-500 mt-6 px-4 leading-relaxed bg-gray-50 p-3 rounded-xl w-full border border-gray-100">
                Berdasarkan tinggi <strong>{{ userData.height }}cm</strong> dan berat <strong>{{ userData.weight }}kg</strong>.
            </p>
        </div>

        <div class="bg-white rounded-[2rem] p-8 shadow-sm relative z-10">
            <h3 class="font-bold text-gray-800 mb-6">Status Gizi & Risiko</h3>

            <div class="flex items-center gap-4 mb-8 bg-green-50 p-5 rounded-2xl border border-green-100">
                <div class="bg-green-100 p-3 rounded-full text-green-600 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                </div>
                <div>
                    <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Berat Ideal</p>
                    <p class="font-bold text-xl text-gray-800">{{ idealWeight }}</p>
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex justify-between text-xs mb-1 font-medium">
                    <span class="text-gray-500">Risiko Penyakit</span>
                    <span class="font-bold transition-colors duration-300" :class="bmiStatus.text">{{ bmiStatus.risk }}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out shadow-sm" 
                         :class="bmiStatus.bg"
                         :style="{ width: bmi >= 30 ? '100%' : bmi >= 25 ? '75%' : bmi >= 18.5 ? '25%' : '10%' }">
                    </div>
                </div>
                
                <div class="mt-4 p-4 bg-gray-50 rounded-2xl text-[11px] text-gray-500 leading-relaxed border border-gray-100">
                    <strong class="text-gray-700 block mb-1">Saran Nutrisi:</strong>
                    {{ bmiStatus.desc }}
                </div>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar { height: 4px; width: 4px; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
