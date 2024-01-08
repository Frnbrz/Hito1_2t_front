import { sharingInformationService } from "@/services"
import { useEffect } from 'react'

const Pageone = () => {
 const  suscription$ = sharingInformationService.getSubject()
 useEffect(() => {
  suscription$.subscribe((data: any) => {
    console.log(data)
  })
 }, [])
 
  return (
    <div>Pageone</div>
  )
}

export default Pageone