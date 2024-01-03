import {announce, car, cart, food, hanger, noti, service, study, others, logo, search, google_logo, logOut, loginLogo, motor} from '../assets/icons'

export const logoIcon = logo;
export const searchIcon = search;
export const googleLogo = google_logo;
export const logOutIcon = logOut; 
export const loginPageLogo = loginLogo; 


export const categories = [
    {to: '/food', label: 'FOOD', icon: food, link: 'food'},
    {to: '/electronics ', label: 'ELECTRONICS ', icon: car, link: 'electronics'},
    {to: '/clothing', label: 'CLOTHING', icon: hanger, link: 'clothing'},
    {to: '/study-material', label: 'STUDY MATERIAL', icon: study, link: 'study material'},
    {to: '/service', label: 'SERVICE', icon: service, link: 'service'},
    {to: '/others', label: 'OTHERS', icon: others, link: 'others'},
    {to: '/transportation', label: 'TRANSPORTATION', icon: motor, link: 'transportation'},
    
]

export const color = {
    primaryColor: '#03D5B2', 
}