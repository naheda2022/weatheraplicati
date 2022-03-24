

const weatherStore = {
    privateCity: '',
  privateCountry: '',
  API_kEY: 'd0333f43ded7b6de6d35f7c914ef4126',
    
  set city(name) {
        console.log('çity name')
        this.privateCity= name
    },
    set country(name) {
        console.log('country name')
        this.privateCountry= name
    },
      async  fetchData(){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.privateCity},${this.privateCountry}&units=metric&appid=${this.API_kEY}`)
        return await res.json()
     
    },    
}
// weatherStore.city = 'csds'

const storage = {
    privateCity: '',
    privateCountry: '',
    set city(name) {
        this.privateCity = name
    },
    set country(name){
        this.privateCountry = name
    },
    saveItem(){
        localStorage.setItem('BD-weather-city', this.privateCity)
        localStorage.setItem('BD-weather-country', this.privateCountry)
    }
}


const UI = {
    city: '',
    country: '',
    loadSelectors(){
        const cityElm = document.querySelector('#city')
        const cityInfoElm = document.querySelector('#w-city')        
        const iconElm = document.querySelector('#w-icon')
        const temperatureElm = document.querySelector('#w-temp')
        const pressureElm = document.querySelector('#w-pressure')
        const humidityElm = document.querySelector('#w-humidity')
        const feelElm = document.querySelector('#w-feel')
        const formElm = document.querySelector('#form')        
        const countryElm = document.querySelector('#country')
        const messageElm = document.querySelector('#messageWrapper')

        return{
            cityElm,
            cityInfoElm,
            countryElm,
            iconElm,
            temperatureElm,
            pressureElm,
            humidityElm,
            feelElm,
            formElm,
           
            messageElm,
        }
    },
    getInputValues(){
       const {cityElm, countryElm} = this.loadSelectors()
       const city = cityElm.value
       const country = countryElm.value
       return {
           city,
           country,
       }
    },
    validateInput(city, country) {
        let error = false
        if(city === '' || country === '') {
            error = true 
        }
        return error
    },
    hideMessage(){
        const msgContentElm= document.querySelector('.err-msg')
        if(msgContentElm){
            setTimeout(() => {
                msgContentElm.remove()
            }, 2000)
            
        }

    },

    showMessage(msg){
        const {messageElm} = this.loadSelectors()
        const msgContentElm = document.querySelector('.err-msg')
        const elm = `<div class='alert alert-danger err-msg'>${msg}</div>`
        if(!msgElm){
            messageElm.insertAdjacentHTML('afterbegin', elm)
        }
       
        this.hideMessage()
        
    },

    getIconSrc( iconCode){
        return 'https://openweathermap.org/img/w/01n.png'
    },

    printWeather(data){
      const {
            cityInfoElm,
             temperatureElm,
             pressureElm,
             humidityElm,
            feelElm,
            iconElm,

    } = this.loadSelectors()
    const {main, weather, name} = data
    console.log(main)
    cityInfoElm.textContent = name
    temperatureElm.textContent = `Temperature: ${main. temp}C`
    humidityElm.textContent = `Humidity: ${main.humidity}kpa`
    pressureElm.textContent = `pressure: ${main.pressure}kpa`
    feelElm.textContent = weather[0].description 
    const src = this.getIconSrc(weather[0].icon)
    iconElm.setAttribute('src', src)
  
    },

    resetInput(){
    const {countryElm, cityElm} = this.loadSelectors()
    cityElm.value = ''
    countryElm.value = ''
    },

    init(){
        const {formElm} = this.loadSelectors()
        formElm.addEventListener('submit', async (e) => {
            e.preventDefault()
           const {city, country} = this.getInputValues()
           this.resetInput()
          const error = this.validateInput(city, country)
          if(error) return this.showMessage('please provide valid input')
           this.city
           this.country
           weatherStore.city = city
           weatherStore.country = country

           storage.city = city
           storage.country = country
           storage.saveItem()

         const data = await  weatherStore.fetchData()
         this.printWeather(data)

          
        })
        document.addEventListener('DOMContentLoaded', async(e) => {
             if(localStorage.getItem('BD-weather-city')){
                 weatherStore.city = localStorage.getItem('BD-weather-city') 
             }
             if(localStorage.getItem('BD-weather-country')){
                weatherStore.country= localStorage.getItem('BD-weather-country') 
            }
            const data = await weatherStore.fetchData()
            this.printWeather(data)
        })
    }, 
}


UI.init();
