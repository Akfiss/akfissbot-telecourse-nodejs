const helpTextMessage = 
`
Selamat datang di AkfissBot! Silahkan gunakan perintah yang tersedia berikut ini:
----

!quote  -> kutipan secara acak
!follow [text]  -> bot akan mengikuti text yang diinputkan
!news   -> berita terkini dari media
!quake  -> berita gempa terbaru dari BMKG
!cuaca  -> berita perkiraan cuaca dari BMKG

----
`

// gunakan function jika menampung parameter, jika tidak gunakan const
// const untuk message only
const invalidCommandMessage =  `Mohon maaf command tidak tersedia!`
const globalErrorMessage = `..`
const globalSuccesMesage = `..`
const pollingErrorMessage = `..`

module.exports = { helpTextMessage, invalidCommandMessage };
