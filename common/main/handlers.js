// const { cleanUpTagHtml } = require('../../common/utils/cleanup')
class CommonHandlers {
  cleaningDate = (dateString) => {
    if (typeof dateString !== 'string') {
      return null;
    }
    const phases = dateString.split(', ');
    if (phases.length !== 2) {
      return null;
    }
    const dateSplitting = phases[0].split('/')
    if (dateSplitting.length !== 3) {
      return null;
    }
    const timeSplitting = phases[1].split(' ')
    if (timeSplitting.length !== 2) {
      return null;
    }
    let stringDate
    stringDate = dateSplitting[2] + '-' + dateSplitting[1] + '-' + dateSplitting[0] + 'T' + timeSplitting[0] + ':00'

    return Date.parse(stringDate)
  }

  cleanupWaktuToDatetime = (dateString) => {
    if (typeof dateString !== 'string') return null

    let arrayOfTime = dateString.split('lalu').splice(0,1)
    if (Array.from(arrayOfTime).length !== 1) return null

    let tmpTime = null
    let holdTime = 0
    arrayOfTime[0].split(' ').forEach((val) => {
      if (parseInt(val) && tmpTime === null) {
        tmpTime = parseInt(val)
      } else {
        holdTime += tmpTime * libWaktu(val)
      }
    })
    return new Date(Date.now() - holdTime)
  }
  libWaktu = (waktuChar) => {
    const lib = {
      'Bulan': 18144000,
      'Minggu': 604800,
      'Jam': 3600,
      'Menit': 60,
      'detik': 1
    }
    return lib[waktuChar] ?? null
  }
}
exports.CommonHandlers = CommonHandlers;
