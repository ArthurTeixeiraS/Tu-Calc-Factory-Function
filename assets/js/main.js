function criaCalculadora(){ //função factory para manipular a calculadora
    //o this, nesse caso, se refere a constante calculadora, então this.clickBotoes() pode ser interpretado como calculadora.clickBotoes()
    return{
        display:document.querySelector('.display'), //captura do elemento display

        inicia(){ //metodo inicia, que starta a calculadora
            this.clickBotoes();
            this.pressionaEnter();
            
        },

        pressionaEnter(){
            this.display.addEventListener('keyup', e => {
               if(e.keyCode === 13){
                this.realizaConta() //executando a conta através do botão Enter
               } 
            })
        },

        realizaConta(){
            let conta = this.display.value;
            try{       
              conta = eval(conta);  //PERIGO!!! FUNÇÃO USADA PARA FINS DIDÁTICOS
              if(!conta){ 
                alert('Conta inválida')
              }
              this.display.value = String(conta)
            }catch(e){
              alert('Conta inválida')  
            }

        },

        clearDisplay(){
          this.display.value = ''  
        },

        deleteOne(){
            this.display.value = this.display.value.slice(0, -1) //slice para apagar digito por digito
        },


        clickBotoes(){ //função que captura os clicks para executar determinadas condições
            //this -> calculadora
            document.addEventListener('click', function(e){ //poderia usar uma arrow function para evitar que o this mudasse
                const el = e.target;
                //this -> document
                if(el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);
                }
                if(el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }
                if(el.classList.contains('btn-del')){
                    this.deleteOne();
                }
                if(el.classList.contains('btn-eq')){
                    this.realizaConta();
                }
                this.display.focus(); //para o enter não repetir a ultima tecla clicada (isso ocorre por comportamento padrão dos Browsers)
            }.bind(this)) //bind faz com que o a função de captura use o this da clickBotoes()
                
        },

        btnParaDisplay(valor){ //joga o valor do botão para o display
            this.display.value += valor
        }
    }
}
const calculadora = criaCalculadora();
calculadora.inicia();