import swal from "sweetalert"
import { currentUser } from "./currentUser"
export   async function loginRequired(){
    if(!currentUser){
    await swal({
        title:'Error',
        text: 'Login first to view this page',
        icon:"warning",
        button:true,
        dangerMode:true

    })
    window.location.href='/login'
}
  }