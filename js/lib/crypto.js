mixins.crypto={data(){return{crypto:"",cryptoStatus:""}},watch:{crypto(t){let r=this.$refs.crypto,e=this.$refs.content;let{encrypted:s,shasum:c}=r.dataset;try{let r=CryptoJS.AES.decrypt(s,t).toString(CryptoJS.enc.Utf8);if(CryptoJS.SHA256(r).toString()===c){this.cryptoStatus="success";e.innerHTML=r;this.render()}else this.cryptoStatus="failure"}catch{this.cryptoStatus="failure"}}}};