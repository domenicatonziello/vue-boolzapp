// Luxon
const dateTime = luxon.DateTime;

const app = Vue.createApp({
    data(){
        return{
            searchChat: '',
            newMessage: '',
            currentIndex: 0,
            user: {
              name: 'Nome Utente',
              avatar: '_io'
            },
            contacts: [
                {
                  name: 'Michele',
                  avatar: '_1',
                  visible: true,
                  messages: [
                    {
                     date: '10/01/2020 15:30:55',
                     text: 'Hai portato a spasso il cane?',
                     status: 'sent'
                    },
                    {
                     date: '10/01/2020 15:50:00',
                     text: 'Ricordati di dargli da mangiare',
                     status: 'sent'
                    },
                    {
                     date: '10/01/2020 16:15:22',
                     text: 'Tutto fatto!',
                     status: 'received'
                    }
                  ],
                },
                {
                  name: 'Fabio',
                  avatar: '_2',
                  visible: true,
                  messages: [{
                     date: '20/03/2020 16:30:00',
                     text: 'Ciao come stai?',
                     status: 'sent'
                   },
                   {
                     date: '20/03/2020 16:30:55',
                     text: 'Bene grazie! Stasera ci vediamo?',
                     status: 'received'
                   },
                   {
                     date: '20/03/2020 16:35:00',
                     text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                     status: 'sent'
                   }
                  ],
                },
                {
                  name: 'Samuele',
                  avatar: '_3',
                  visible: true,
                  messages: [{
                     date: '28/03/2020 10:10:40',
                     text: 'La Marianna va in campagna',
                     status: 'received'
                   },
                   {
                     date: '28/03/2020 10:20:10',
                     text: 'Sicuro di non aver sbagliato chat?',
                     status: 'sent'
                   },
                   {
                     date: '28/03/2020 16:15:22',
                     text: 'Ah scusa!',
                     status: 'received'
                   }
                 ],
                },
                {
                  name: 'Luisa',
                  avatar: '_4',
                  visible: true,
                  messages: [{
                     date: '10/01/2020 15:30:55',
                     text: 'Lo sai che ha aperto una nuova pizzeria?',
                     status: 'sent'
                   },
                   {
                     date: '10/01/2020 15:50:00',
                     text: 'Si, ma preferirei andare al cinema',
                     status: 'received'
                   }
                  ],
                },
            ]
        }
    },
    computed:{
        currentContact(){
            return this.contacts[this.currentIndex];
        },
        currentMessages(){
            return this.currentContact.messages;
        }
    },
    methods:{
        setCurrentIndex(index){
            this.currentIndex = index;
        },
        sendNewMessage(){
            if(this.newMessage.trim()){
               this.addMessage('sent', this.newMessage);
                this.newMessage = ''
                this.autoreply();
            }
        },
        addMessage(status, text){
          const newMessage ={
            text,
            status,
            date: this.getCurrentMoment()
          };
          this.currentMessages.push(newMessage);
        },
        autoreply(){
          setTimeout (()=>{
            this.addMessage('received','ok');
          }, 1000)
        },
        changeVisible(){
          this.contacts.forEach(contact => {
              if(!contact.name.toLowerCase().includes(this.searchChat.toLowerCase())){
                  contact.visible = false;
              }
              if(!this.searchChat){
                  contact.visible = true;
              }
          });
        },
        getCurrentMoment(){
          return dateTime.now().setLocale('it').toLocaleString(dateTime.DATETIME_SHORT);
        },
        deleteMessage(index){
          this.currentMessages.splice(index,1)
        },
        getLastMessage(i){
          return this.contacts[i].messages[this.contacts[i].messages.length - 1];
        }
    }  
});

app.mount('#root');
