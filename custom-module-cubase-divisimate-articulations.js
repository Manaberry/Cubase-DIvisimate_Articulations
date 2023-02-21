//define the variables for the track name function
var trackName = ""
var pos = 72
var rootPosLCD = 72
var keepStringVal = 0
var trackNameJoined = ""
var bufferTrackName = ""
var posBuffer = 72

const fs = nativeRequire('fs');
const xml2js = nativeRequire('xml2js');
const glob = nativeRequire('glob');

var midiPort_MCU_From_OSC = 'MCU_1'
var midiPort_MCU_To_OSC = 'MCU_2'

//Cubase expression maps and Divisimate presets
var mapFiles = glob.sync('/Users/dsp/Documents/Open Stage Control/expressions/*')
var harmoFiles = glob.sync('/Users/dsp/Documents/Open Stage Control/harmonizer/*')

//Set the address of the library buttons
var artButtons = {
    'b1': '/b1/show', 'b2': '/b2/show', 'b3': '/b3/show', 'b4': '/b4/show', 'b5': '/b5/show',
    'b6': '/b6/show', 'b7': '/b7/show', 'b8': '/b8/show', 'b9': '/b9/show', 'b10': '/b10/show',
    'b11': '/b11/show', 'b12': '/b12/show', 'b13': '/b13/show', 'b14': '/b14/show', 'b15': '/b15/show',
    'b16': '/b16/show', 'b17': '/b17/show', 'b18': '/b18/show', 'b19': '/b19/show', 'b20': '/b20/show',
    'b21': '/b21/show', 'b22': '/b22/show', 'b23': '/b23/show', 'b24': '/b24/show', 'b25': '/b25/show',
    'b26': '/b26/show', 'b27': '/b27/show', 'b28': '/b28/show', 'b29': '/b29/show', 'b30': '/b30/show',
    'b31': '/b31/show', 'b32': '/b32/show', 'b33': '/b33/show', 'b34': '/b34/show', 'b35': '/b35/show',
    'b36': '/36/show', 'b37': '/b37/show', 'b38': '/b38/show', 'b39': '/b39/show', 'b40': '/b40/show',
    'b41': '/b41/show', 'b42': '/b42/show', 'b43': '/b43/show', 'b44': '/b44/show', 'b45': '/b45/show'
}
var artLabels = {
    'b1': '/b1/label', 'b2': '/b2/label', 'b3': '/b3/label', 'b4': '/b4/label', 'b5': '/b5/label',
    'b6': '/b6/label', 'b7': '/b7/label', 'b8': '/b8/label', 'b9': '/b9/label', 'b10': '/b10/label',
    'b11': '/b11/label', 'b12': '/b12/label', 'b13': '/b13/label', 'b14': '/b14/label', 'b15': '/b15/label',
    'b16': '/b16/label', 'b17': '/b17/label', 'b18': '/b18/label', 'b19': '/b19/label', 'b20': '/b20/label',
    'b21': '/b21/label', 'b22': '/b22/label', 'b23': '/b23/label', 'b24': '/b24/label', 'b25': '/b25/label',
    'b26': '/b26/label', 'b27': '/b27/label', 'b28': '/b28/label', 'b29': '/b29/label', 'b30': '/b30/label',
    'b31': '/b31/label', 'b32': '/b32/label', 'b33': '/b33/label', 'b34': '/b34/label', 'b35': '/b35/label',
    'b36': '/36/label', 'b37': '/b37/label', 'b38': '/b38/label', 'b39': '/b39/label', 'b40': '/b40/label',
    'b41': '/b41/label', 'b42': '/b42/label', 'b43': '/b43/label', 'b44': '/b44/label', 'b45': '/b45/label'
}
var artProgram = {
    'b1': '/b1/prog', 'b2': '/b2/prog', 'b3': '/b3/prog', 'b4': '/b4/prog', 'b5': '/b5/prog',
    'b6': '/b6/prog', 'b7': '/b7/prog', 'b8': '/b8/prog', 'b9': '/b9/prog', 'b10': '/b10/prog',
    'b11': '/b11/prog', 'b12': '/b12/prog', 'b13': '/b13/prog', 'b14': '/b14/prog', 'b15': '/b15/prog',
    'b16': '/b16/prog', 'b17': '/b17/prog', 'b18': '/b18/prog', 'b19': '/b19/prog', 'b20': '/b20/prog',
    'b21': '/b21/prog', 'b22': '/b22/prog', 'b23': '/b23/prog', 'b24': '/b24/prog', 'b25': '/b25/prog',
    'b26': '/b26/prog', 'b27': '/b27/prog', 'b28': '/b28/prog', 'b29': '/b29/prog', 'b30': '/b30/prog',
    'b31': '/b31/prog', 'b32': '/b32/prog', 'b33': '/b33/prog', 'b34': '/b34/prog', 'b35': '/b35/prog',
    'b36': '/36/prog', 'b37': '/b37/prog', 'b38': '/b38/prog', 'b39': '/b39/prog', 'b40': '/b40/prog',
    'b41': '/b41/prog', 'b42': '/b42/prog', 'b43': '/b43/prog', 'b44': '/b44/prog', 'b45': '/b45/prog'
}
var artColor = {
    'b1': '/b1/color', 'b2': '/b2/color', 'b3': '/b3/color', 'b4': '/b4/color', 'b5': '/b5/color',
    'b6': '/b6/color', 'b7': '/b7/color', 'b8': '/b8/color', 'b9': '/b9/color', 'b10': '/b10/color',
    'b11': '/b11/color', 'b12': '/b12/color', 'b13': '/b13/color', 'b14': '/b14/color', 'b15': '/b15/color',
    'b16': '/b16/color', 'b17': '/b17/color', 'b18': '/b18/color', 'b19': '/b19/color', 'b20': '/b20/color',
    'b21': '/b21/color', 'b22': '/b22/color', 'b23': '/b23/color', 'b24': '/b24/color', 'b25': '/b25/color',
    'b26': '/b26/color', 'b27': '/b27/color', 'b28': '/b28/color', 'b29': '/b29/color', 'b30': '/b30/color',
    'b31': '/b31/color', 'b32': '/b32/color', 'b33': '/b33/color', 'b34': '/b34/color', 'b35': '/b35/color',
    'b36': '/36/color', 'b37': '/b37/color', 'b38': '/b38/color', 'b39': '/b39/color', 'b40': '/b40/color',
    'b41': '/b41/color', 'b42': '/b42/color', 'b43': '/b43/color', 'b44': '/b44/color', 'b45': '/b45/color'
}
var harmoButtons = {
    'h1': '/h1/show', 'h2': '/h2/show', 'h3': '/h3/show', 'h4': '/h4/show', 'h5': '/h5/show',
    'h6': '/h6/show', 'h7': '/h7/show', 'h8': '/h8/show', 'h9': '/h9/show', 'h10': '/h10/show',
    'h11': '/h11/show', 'h12': '/h12/show', 'h13': '/h13/show', 'h14': '/h14/show', 'h15': '/h15/show',
    'h16': '/h16/show', 'h17': '/h17/show', 'h18': '/h18/show', 'h19': '/h19/show', 'h20': '/h20/show',
    'h21': '/h21/show', 'h22': '/h22/show', 'h23': '/h23/show', 'h24': '/h24/show', 'h25': '/h25/show',
    'h26': '/h26/show', 'h27': '/h27/show', 'h28': '/h28/show', 'h29': '/h29/show', 'h30': '/h30/show',
    'h31': '/h31/show', 'h32': '/h32/show', 'h33': '/h33/show', 'h34': '/h34/show', 'h35': '/h35/show',
    'h36': '/36/show', 'h37': '/h37/show', 'h38': '/h38/show', 'h39': '/h39/show', 'h40': '/h40/show',
    'h41': '/h41/show', 'h42': '/h42/show', 'h43': '/h43/show', 'h44': '/h44/show', 'h45': '/h45/show'
}
var harmoLabels = {
    'h1': '/h1/label', 'h2': '/h2/label', 'h3': '/h3/label', 'h4': '/h4/label', 'h5': '/h5/label',
    'h6': '/h6/label', 'h7': '/h7/label', 'h8': '/h8/label', 'h9': '/h9/label', 'h10': '/h10/label',
    'h11': '/h11/label', 'h12': '/h12/label', 'h13': '/h13/label', 'h14': '/h14/label', 'h15': '/h15/label',
    'h16': '/h16/label', 'h17': '/h17/label', 'h18': '/h18/label', 'h19': '/h19/label', 'h20': '/h20/label',
    'h21': '/h21/label', 'h22': '/h22/label', 'h23': '/h23/label', 'h24': '/h24/label', 'h25': '/h25/label',
    'h26': '/h26/label', 'h27': '/h27/label', 'h28': '/h28/label', 'h29': '/h29/label', 'h30': '/h30/label',
    'h31': '/h31/label', 'h32': '/h32/label', 'h33': '/h33/label', 'h34': '/h34/label', 'h35': '/h35/label',
    'h36': '/36/label', 'h37': '/h37/label', 'h38': '/h38/label', 'h39': '/h39/label', 'h40': '/h40/label',
    'h41': '/h41/label', 'h42': '/h42/label', 'h43': '/h43/label', 'h44': '/h44/label', 'h45': '/h45/label'
}
var harmoProgram = {
    'h1': '/h1/prog', 'h2': '/h2/prog', 'h3': '/h3/prog', 'h4': '/h4/prog', 'h5': '/h5/prog',
    'h6': '/h6/prog', 'h7': '/h7/prog', 'h8': '/h8/prog', 'h9': '/h9/prog', 'h10': '/h10/prog',
    'h11': '/h11/prog', 'h12': '/h12/prog', 'h13': '/h13/prog', 'h14': '/h14/prog', 'h15': '/h15/prog',
    'h16': '/h16/prog', 'h17': '/h17/prog', 'h18': '/h18/prog', 'h19': '/h19/prog', 'h20': '/h20/prog',
    'h21': '/h21/prog', 'h22': '/h22/prog', 'h23': '/h23/prog', 'h24': '/h24/prog', 'h25': '/h25/prog',
    'h26': '/h26/prog', 'h27': '/h27/prog', 'h28': '/h28/prog', 'h29': '/h29/prog', 'h30': '/h30/prog',
    'h31': '/h31/prog', 'h32': '/h32/prog', 'h33': '/h33/prog', 'h34': '/h34/prog', 'h35': '/h35/prog',
    'h36': '/36/prog', 'h37': '/h37/prog', 'h38': '/h38/prog', 'h39': '/h39/prog', 'h40': '/h40/prog',
    'h41': '/h41/prog', 'h42': '/h42/prog', 'h43': '/h43/prog', 'h44': '/h44/prog', 'h45': '/h45/prog'
}

module.exports = {

    oscInFilter: function (data) {
        var { address, args, host, port } = data
        // MTC PARSING
        if (data.host === 'midi' && data.port === 'MCU_2') {
            var [channel, control, value] = data.args.map(x => x.value)
            if (control > 66 && control < 74) {

                var digit = 74 - control,
                    msb = value >> 4,
                    val = value & 0xF
                if (msb >> 2) val += '.'
                if (!(msb & (1 << 1))) val = ''
                //if (val === 0) val = ''
                receive('/timecode', digit, val)
                return
            }

        }
        //HUI MTC
        if (data.address === '/sysex' && data.args[0].value.includes('f0 00 00 66 05 00 11')) { // hui sysex timecode

            var digits = data.args[0].value.split(" ").slice(7).map(x => {
                if (x[0] === '0') return x[1] + ' '
                else x[1] + '.'
            })
            digits.pop()
            var i = 7
            for (var d of digits) {
                huiTimecode[i] = d
                i--
            }

            receive('/mtc2', huiTimecode.join('')) // send timecode as single string for example
            return

        }


        var { address, args, host, port } = data
        mcuToOsc(host, port, address, args)
        return { address, args, host, port }


    },

    oscOutFilter: function (data) {

        var { address, args, host, port } = data

        if (address == '/resetMCU') {
            send('midi', midiPort_MCU_From_OSC, '/note', 1, 44, 127);
            harmoPopulation(harmoFiles)
        }

        return data  //End of OSC out Filter here
    }
}


//These are your functions that do the work in JS

function mcuToOsc(host, port, address, args) {

    if (host !== 'midi' || port !== midiPort_MCU_To_OSC) return

    var inArgs = args.map(x => x.value),
        outArgs = [],
        action = ''
    // SYSEX
    if (address === '/sysex') {

        var [value] = inArgs

        if (value.includes("f0 00 00 66 14 12")) {
            let sysExVal = args[0].value
            let fullTrackName = getTrackName(sysExVal)
            sendTrackName(fullTrackName)

            trackMapTag = (fullTrackName.substring(fullTrackName.length - 30));
            trackMapTag = trackMapTag.replace('[', '')
            trackMapTag = trackMapTag.replace(']', '')

            buildMap(trackMapTag)
        }
    }


}

function getTrackName(sysExVal) {

    var nameDone = false


    var d = sysExVal.split(" ").slice(6).map(x => parseInt(x, 16)) 
    pos = d[0] 

    text = d.slice(1).map(x => String.fromCharCode(x))
    if (pos < 29) {

        return trackNameJoined
    }

    text.pop()             
    trackName = text.join('')

    nameLengthCheck = bufferTrackName.length - trackName.length

    charFromStart = pos - rootPosLCD

    var lengthCheck = charFromStart + trackName.length

    if (lengthCheck < 29) {
        let newEndLength = 29 - charFromStart - trackName.length
        newEnd = bufferTrackName.substring(bufferTrackName.length - newEndLength)
    } else { newEnd = "" }

    if (pos == 72) {       
        trackNameJoined = trackName + newEnd
        bufferTrackName = trackNameJoined
        posBuffer = pos
        nameDone = true

    } else if (pos > posBuffer && posBuffer == 72 && nameDone == false) {

        keepStringVal = pos - posBuffer  
        var prevTrackKeep = bufferTrackName.substring(0, keepStringVal)
        trackNameJoined = prevTrackKeep + trackName + newEnd
        bufferTrackName = trackNameJoined
        posBuffer = pos
        nameDone = true
    } else {
        keepStringVal = pos - rootPosLCD  
        var prevTrackKeep = bufferTrackName.substring(0, keepStringVal)
        trackNameJoined = prevTrackKeep + trackName + newEnd
        bufferTrackName = trackNameJoined
        posBuffer = pos
        nameDone = true
    }

    const findMidiTag = '(';

    var posMidiTag = trackNameJoined.search("\\(M");
    var posBrackTag = trackNameJoined.search("\\(");
    var trackNameJoinedTrim = ""

    if (posBrackTag == trackNameJoined.length - 1) {
        trackNameJoinedTrim = trackNameJoined.substring(0, (posBrackTag - 1))
        trackNameJoined = trackNameJoinedTrim
    }

    if (posMidiTag > -1) {

        trackNameJoinedTrim = trackNameJoined.substring(0, (posMidiTag - 1))
        trackNameJoined = trackNameJoinedTrim

    }

    trackNameJoined = trackNameJoined.trimEnd();

    return trackNameJoined
}

function sendTrackName(fullTrackName) {


    var trackNameLabel = { 'trackName': '/trackName/Label' }

    console.log("Selected track = " + fullTrackName)
    receiveOsc({
        address: Object.values(trackNameLabel), 
        args: [
            { type: 's', value: fullTrackName }
        ]
    })

    return
}

async function buildMap(trackMapTag) {
    const artArr = [];
    const artColor = [];
    const artProg = [];


    for (const mapFile of mapFiles) {

        let mapName = "Not Defined"

        if (mapFile.includes(trackMapTag)) { 


            const parser = new xml2js.Parser({
                explicitArray: false,
                mergeAttrs: true
            }); // 'mergeAttrs: true' was essential
            console.log('Selected Map:  ' + mapFile);
            const data = await fs.promises.readFile(mapFile);
            const result = await parser.parseStringPromise(data);

            mapName = result.InstrumentMap.string.value
            const art = result.InstrumentMap.member[1].list.obj;

            for (let i = 0, len = art.length; i < len; i++) {

                artArr[i] = art[i].member[1].string.value
                //artColor[i] = art[i].int.value
                artProg[i] = art[i].obj[0].int[1].value
            }

            addExpBtnLabels(artArr, artProg)

            break;
        }
    }
    return { artArr, artProg };
}
function harmoPopulation(files) {
    console.log(files)
    harmoButtonGrid = files.length

    for (i = 0; i < harmoButtonGrid; i++) {
        var harmoText = files[i]
        var pathRemoved = harmoText.substring(harmoText.length, 51)
        var extRemoved = pathRemoved.slice(0, pathRemoved.length - 9)

        receiveOsc({
            address: Object.values(harmoButtons)[i],
            args: [
                { type: 'i', value: 1 }
            ]
        })

        receiveOsc({
            address: Object.values(harmoLabels)[i],
            args: [
                { type: 's', value: extRemoved }
            ]
        })
        receiveOsc({
            address: Object.values(harmoProgram)[i],
            args: [
                { type: 's', value: i + 1 }
            ]
        })

    }

    for (i = harmoButtonGrid; i < 45; i++) { 
        receiveOsc({
            address: Object.values(harmoButtons)[i], 
            args: [
                { type: 'i', value: 0 }
            ]
        })
    }

}


function addExpBtnLabels(artArr, artProg) {

    var artButtonGrid = artArr.length 
    for (i = 0; i < artButtonGrid; i++) {

        var artText = artArr[i] 
        var artProgramChange = artProg[i] 
        // Setting colors for long, short, and else articulations
        if (artProgramChange == -1) { //modifiers - Articulation with no Remote value
            artColoris = 'grey'
        } else if (artProgramChange >= 1 && artProgramChange <= 19) { //Long
            artColoris = '#03fc98'
        } else if (artProgramChange >= 21 && artProgramChange <= 35) { //Short
            artColoris = 'orange'
        } else if (artProgramChange >= 36 && artProgramChange <= 78) { //Else
            artColoris = '#ba3bff'
        } else { //Latency Art
            artColoris = '#63D7FF'
        }


        receiveOsc({
            address: Object.values(artButtons)[i],
            args: [
                { type: 'i', value: 1 }
            ]
        })

        receiveOsc({
            address: Object.values(artLabels)[i],
            args: [
                { type: 's', value: artText }
            ]
        })

        receiveOsc({
            address: Object.values(artProgram)[i],
            args: [
                { type: 's', value: artProgramChange }
            ]
        })
        receiveOsc({
            address: Object.values(artColor)[i],
            args: [
                { type: 's', value: artColoris }
            ]
        })
    }

    for (i = artButtonGrid; i < 45; i++) { 
        receiveOsc({
            address: Object.values(artButtons)[i], 
            args: [
                { type: 'i', value: 0 }
            ]
        })
    }
}