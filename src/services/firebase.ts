export default {
    callFunction : (functionName:String, data:Object) => {
        const refresher = firebaseFunctions.httpsCallable(functionName)
        return refresher(data)
    }
}