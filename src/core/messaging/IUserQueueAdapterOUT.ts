export interface IUserQueueAdapterOUT {
 
    publish(queue: string, message: string): Promise<void>
    
}