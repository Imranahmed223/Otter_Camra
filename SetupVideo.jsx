import React from 'react'
import { StyleSheet, View, Switch, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ConfigDropDown from './ConfigDropdown'
import {settings} from './Settings'
import { CameraInfo } from './CameraInfo'


class VideoSettingsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.cameraInfo = CameraInfo.getInstance()
        if (this.cameraInfo == null) {
            console.log('no CameraInfo')
            this.cameraInfo = new CameraInfo([])
        }

        let videoConfig = settings.getVideoConfig()
        this.startCam = [
            { label:"Back side", value:"back" },
            { label:"Front side", value: "front" }
        ]

        let camId = this.getDefaultCam(videoConfig)
        this.defaultCamId = camId
        this.backCam = this.cameraInfo.getBackCameraList() ?? []
        this.frontCam = this.cameraInfo.getFrontCameraList() ?? []
        const res = this.cameraInfo.getResolutions(camId)
        const resolutionList = this.arrayToOptions(res) 
        const fps = this.cameraInfo.getFps(camId)
        const fpsList = this.arrayToOptions(fps)
        
        
        this.orientations = [
            { label:'Landscape', value:'landscape' },
            { label:'Portrait',  value: 'portrait' }
        ]
        this.liveRotationList = [
            { label:'Off', value:'off' },
            { label:'Follow screen rotation', value:'follow' },
            { label:'Lock while broadcasting',  value: 'lock' }
        ]

        this.formats = [
            { label:'H.264', value:'avc' },
            { label:'HEVC',  value: 'hevc' }
        ]

        this.state = {
            resolutionList: resolutionList,
            fpsList: fpsList,
            selectedCam: this.defaultCamId,
            resLabel: 'Resolution',
            bitrateStr: "" + videoConfig.bitrate,
            videoConfig: videoConfig
        }
    
    }

    arrayToOptions = (data, prefix) => {
        return data.map( elem => {
            return {
                label: prefix == null ? elem : prefix + elem,
                value: elem
            }
        } )
    } 
 

    onChangeField = (field, newValue) => {
        let upd = {}
        upd[field] = newValue
        let config = {}
        Object.assign(config, this.state.videoConfig, upd)
        let val = config[field]
        console.log(`OnChange ${field} ${val}`)
        //this.videoConfig = config
        if (field == 'bitrate') {
            this.setState({bitrateStr: `${newValue}`, videoConfig: config})
        } else {
            this.setState({videoConfig: config})

        }
        this.onChange(field, upd)
    }

    onChange = (field, newConfig) => {
        let config = {}
        Object.assign(config, this.state.videoConfig)
        config[field] = newConfig[field]
        if (field == 'cameraPos' || field == 'defaultBackCamera' || field == 'defaultFrontCamera') {
            let camId = this.getDefaultCam(newConfig)
            if (camId != this.defaultCamId) {
                console.log(`updating lists for cam ${camId}`)
                const resolutions = this.cameraInfo.getResolutions(camId)
                const resolutionList = this.arrayToOptions(resolutions)
                const fps = this.cameraInfo.getFps(camId)
                const fpsList = this.arrayToOptions(fps)

                let currentRes = config.res
                let newRes = this.findNearestRes(currentRes, resolutions)
                if (newRes != currentRes) {
                    config.res = newRes
                }

                let currentFps = config.fps
                let newFps = this.findNearestFps(currentFps, fps)
                if (newFps != currentFps) {
                    config.fps = newFps
                }

                this.setState({
                    videoConfig: config,
                    resolutionList: resolutionList,
                    fpsList: fpsList,
                    selectedCam: camId
                })
                this.defaultCamId = camId
            }
        } else {
            this.setState({videoConfig: config})
        }

        console.log(config)
        settings.saveVideoConfig(config)

    }

    findNearestRes = (targetRes, resolutions) => {
        let foundRes = "320x240"
        let foundW = 320
        let foundH = 240
        let [targetW, targetH] = targetRes.split('x')
        let matching = resolutions.find( res => {
            if (res == targetRes) {
                return true
            }
            let [wStr, hStr] = res.split('x',2)
            let w = parseInt(wStr)
            let h = parseInt(hStr)
            if (w <= targetW && h <= targetH && (w >= foundW || h >= foundH)) {
                foundRes = res
                foundH = h
                foundW = w
            }
            return false

        })
        return matching ?? foundRes
    }

    findNearestFps = (taretFps, fpsOptions) => {
        let matching = fpsOptions.find( fps => fps == taretFps)
        return matching ?? fpsOptions[fpsOptions.length -1]


    }

    getDefaultCam = (config) => {
        let camId = '0'
        if (config.cameraPos == 'front') {
            camId = config.defaultFrontCamera ?? this.cameraInfo.getDefaultFrontCamera()
        } else {
            camId = config.defaultBackCamera ?? this.cameraInfo.getDefaultBackCamera()
        }
        return camId ?? '0'
    }

    render() {
        return (
        <SafeAreaView edges={['top', 'left', 'bottom']}>
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Initial camera' items={this.startCam} field='cameraPos' />
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Back camera' items={this.backCam} field='defaultBackCamera' />
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Front camera' items={this.frontCam} field='defaultFrontCamera' />
                <ConfigDropDown config={this.state.videoConfig} value={this.state.videoConfig.res} onChange={this.onChange} label={this.state.resLabel} items={this.state.resolutionList} field='res' cam={this.state.selectedCam} />
                <ConfigDropDown config={this.state.videoConfig} value={this.state.videoConfig.fps} onChange={this.onChange} label='Frame rate' items={this.state.fpsList} field='fps' cam={this.state.selectedCam} />
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Orientation' items={this.orientations} field='orientation' />
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Live rotation' items={this.liveRotationList} field='liveRotation' />
                <Text>Bitrate (Kbps)</Text>
                <TextInput style={styles.textEdit} onChangeText={(newValue) => this.onChangeField('bitrate', parseInt("0"+newValue))} placeholder="0" keyboardType={'number-pad'} value={this.state.bitrateStr} />
                <ConfigDropDown config={this.state.videoConfig} onChange={this.onChange} label='Format' items={this.formats} field='format' />

            </KeyboardAwareScrollView>
        </SafeAreaView> )
    }
}

const styles = StyleSheet.create({
    checkboxRow: {
      flexDirection: 'row',
      padding: 10
    },
    checkboxTitle: {
        flexBasis: 'auto',
        flexGrow: 1
    },
    checkboxItem: {
        marginLeft: 10
    },

    textEdit: {
        margin: 4,
        marginBottom: 10,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 4,
        borderWidth: 1,
        borderRadius: 4,

    }    
  });

export default VideoSettingsScreen;