export interface IDoctorQueueAdapterOUT {
 
    publish(queue: string, message: string): Promise<void>
    
}