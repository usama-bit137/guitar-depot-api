module.exports = (temp, guitar) => {
    let output = temp.replace(/{%IMG%}/g, guitar.img);
    output = output.replace(/{%MANUFACTURER%}/g, guitar.manufacturer)
    output = output.replace(/{%NAME%}/g, guitar.name)
    output = output.replace(/{%FRETBOARD%}/g, guitar.introduced)
    output = output.replace(/{%INTRODUCED%}/g, guitar.introduced)
    output = output.replace(/{%BODY%}/g, guitar.body)
    
    output = output.replace(/{%NECK%}/g, guitar.neck)
    output = output.replace(/{%SCALE%}/g, guitar.scale)
    output = output.replace(/{%BRIDGE%}/g, guitar.bridge)
    output = output.replace(/{%PICKUPS%}/g, guitar.pickups)
    
    output = output.replace(/{%DESCRIPTION%}/g, guitar.desc)
    output = output.replace(/{%ID%}/g, guitar.id) 
    return output
}