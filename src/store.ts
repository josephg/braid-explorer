import Temp from './views/Temp.svelte'
import type { PaneContents, PaneStream } from "./types"
import {subscribe} from '@josephg/braid-client'
import { readable } from 'svelte/store'

const list = (url: string, children: string[]): PaneContents => ({
  type: 'List',
  content: children.map(l => ({label: l, url: `${url}/${l}`}))
})

// '/': {
//   type: 'List',
//   items: [
//     {label: 'System', url: '/System'},
//     {label: 'Devices', url: '/2'},
//     {label: 'three', url: '/3'},
//     {label: 'four', url: '/4'},
//   ]
// },
const docs: Record<string, PaneContents> = {
  '/': list('', ['System', 'Network', 'Projects', 'demo']),
  '/System': list('/System', ['CPU', 'Processes', 'Netstat']),

  '/System/CPU': list('/System/CPU', ['Info', 'Temperature']),
  '/System/CPU/Info': {
    type: 'JSON',
    content: {
      make: 'GenuineIntel',
      "processor"	: 0,
      "vendor_id"	: "AuthenticAMD",
      "cpu family"	: 25,
      "model"	: 33,
      "model name"	: "AMD Ryzen 7 5800X 8-Core Processor",
      "stepping"	: 0,
      "microcode"	: "0xa201009",
      "cpu MHz"	: 2189.442,
      "cache size"	: "512 KB",
      "physical id"	: 0,
      "siblings"	: 16,
      "core id"	: 7,
      "cpu cores"	: 8,
      "apicid"	: 15,
      "initial apicid"	: 15,
      "fpu"	: true,
      "fpu_exception"	: true,
      "cpuid level"	: 16,
      "wp"	: true,
      "bugs"		: ['sysret_ss_attrs', 'spectre_v1', 'spectre_v2', 'spec_store_bypass'],
      "bogomips"	: 7600.00,
      "TLB size"	: '2560 4K pages',
      "clflush size"	: 64,
      "cache_alignment"	: 64,
      "address sizes"	: '48 bits physical, 48 bits virtual',
      "power management": 'ts ttp tm hwpstate cpb eff_freq_ro [13] [14]',

    }
  },
  '/System/CPU/Temperature': {
    type: 'JSON',
    content: {celcius: 77},
    view: Temp
  },

  '/Network': list('/Network', ["Seph's iPad", 'seph-freebsd', 'Unifi Controller']),
  '/Network/Unifi Controller': list('/Network/Unifi Controller', [
    'Configuration',
    'Status'
  ]),

  '/demo': {
    type: 'List',
    content: [{label: 'time', url: 'http://localhost:2001/time'}]
  },

  '/null': {type: 'List', content: []}
}

export default async function getContent(url: string): Promise<PaneStream> {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log('subscribe!', url)
    const {initialValue, stream} = await subscribe(url)

    async function *s(): AsyncGenerator<PaneContents> {
      for await (const {value} of stream) {
        yield {
          type: 'JSON',
          content: value
        }
      }
    }
    return readable({
      type: 'JSON',
      content: initialValue,
    }, set => {
      let running = true
      ;(async () => {
        for await (const {value} of stream) {
          console.log('got value', value)
          set({type: 'JSON', content: value})
        }
      })()

      return () => {
        running = false
        stream.return()
      }
    })
  } else {
    return docs[url] ? readable(docs[url], () => {})
     : readable({type: 'null'}, () => {})
  }
}