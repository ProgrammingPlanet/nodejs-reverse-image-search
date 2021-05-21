const app = Vue.createApp({
    data() {
        return {
            IMGBB_API_KEY: 'abfe6c7d869516a107e6660fa2e3dbe2',
            showUpload: true,
            img: {
                url: '',
                name: '',
                base64: '',
                file: null,
                allowedTypes: ['png', 'jpeg', 'bmp']
            },
            searchEngines: [
                {
                    name: 'Google',
                    icon: 'google.svg',
                    imgSearchUrl: 'https://www.google.com/searchbyimage?image_url='
                },
                {
                    name: 'Bing',
                    icon: 'bing.svg',
                    imgSearchUrl: 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl='
                },
                {
                    name: 'Yandex',
                    icon: 'yandex.svg',
                    imgSearchUrl: 'https://yandex.com/images/search?source=collections&url='
                },
                {
                    name: 'TinEye',
                    icon: 'tineye.svg',
                    imgSearchUrl: 'https://www.tineye.com/search/?url='
                },
                {
                    name: 'Sogou',
                    icon: 'sogou.svg',
                    imgSearchUrl: 'https://pic.sogou.com/ris?flag=1&drag=0&query='
                },
                {
                    name: 'Baidu',
                    icon: 'baidu.svg',
                    imgSearchUrl: 'https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&image='
                },
            ]
        }
    },
    methods: {
        async assignFile(){
            this.img.file = this.$refs.filebtn.files[0]

            const fileReader = new SyncFileReader(this.img.file)
            this.img.base64 = await fileReader.readAsDataURL()

            this.img.name = this.img.file.name
            this.img.url = ''
        },
        selectFile(){
            this.$refs.filebtn.click()
        },
        search(engine){
            
            let target_engine = this.searchEngines.find(x => x.name === engine)

            if(target_engine && this.img.url !== '')
            {
                window.open(`${target_engine.imgSearchUrl}${this.img.url}`,'_blank')
            }
            else{
                alert('invalid url or file')
            }
        },
        upload(){
            if(valid_url(this.img.url))
            {
                this.showUpload = false
            }
            else if(this.img.file)
            {
                let self = this
                var fd = new FormData()
                fd.append('image', this.img.file)
                fd.append('expiration', '600')
                fd.append('key', this.IMGBB_API_KEY)
                
                fetch('https://api.imgbb.com/1/upload',{
                    method: 'POST',
                    body: fd
                })
                .then(response => response.json())
                .then(resp => {                     //success
                    if(resp.success){
                        self.img.url = resp.data.url
                        this.showUpload = false
                    }
                    else{
                        alert('error uploading image. Try Again.')
                    }
                })
                .catch(error => console.log(error)) //error
            }
            else
            {
                return alert('upload image file or paste valid url')
            }
        }
    }

})

app.mount('#app')


function SyncFileReader(file) 
{
    let self = this;
    let ready = false;
    let result = '';

    const sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    self.readAsDataURL = async function() {
        while(ready === false){
            await sleep(100);
        }
        return result;
    }

    const reader = new FileReader();
    reader.onloadend = function(evt) {
    result = evt.target.result;
    ready = true;
    };
    reader.readAsDataURL(file);
}

function valid_url(url)
{
    try{
        let u = new URL(url)
        return true
    }
    catch(e){
        return false
    }
}
