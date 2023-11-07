const mockShopDetail = {
  shopId: 44,
  placeId: 'ChIJlT9G2NChfDURJ76xQh0V3XE',
  name: '그릴640',
  formattedAddress: '대한민국 서울특별시 강남구 역삼동 735-25',
  lat: 37.4986651,
  lng: 127.0340201,
  formattedPhoneNumber: '02-554-0640',
  openNow: true,
  totalRating: -1,
  ratingCount: 1,
  category: 'restaurant',
  todayPeriod: [1130, 2230],
  periods: [
    null,
    {
      open: {
        day: 1,
        time: 1130,
      },
      close: {
        day: 1,
        time: 2230,
      },
    },
    {
      open: {
        day: 2,
        time: 1130,
      },
      close: {
        day: 2,
        time: 2230,
      },
    },
    {
      open: {
        day: 3,
        time: 1130,
      },
      close: {
        day: 3,
        time: 2230,
      },
    },
    {
      open: {
        day: 4,
        time: 1130,
      },
      close: {
        day: 4,
        time: 2230,
      },
    },
    {
      open: {
        day: 5,
        time: 1130,
      },
      close: {
        day: 5,
        time: 2230,
      },
    },
    {
      open: {
        day: 6,
        time: 1730,
      },
      close: {
        day: 6,
        time: 2200,
      },
    },
  ],
  scrap: null,
  photos: [
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuEUuJjFebTP_6i_dX5FFK22fx5obHOdpJshw6cWqoEFbnORl5tJf8PNQBGv0rwIceXmvHyQeyAUpB_V5NWONyiT1xLi2oj4mVlQ6xBw0JCVD3HXYIaax5Vr5S-X8hWrkVgQtXvUbSqBRsuF-rKnhaHujFuYvGm-bE742SNQ40CAbkVa&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuEJAm119UE9O3UthoqqpY91DxMjLXjUT3BnjiqSPUs48NFSIi1NTy2XR-CiYhejBqKGUlr23mO0YaCpukfn5fH9gHLBnSSQCRzW2S2jA7xGU_e_76BcJR2m1pUWftfW2C19nnxlX7B_dp5U2RgKpzIkt7ecvtSUf3JaYdHNQwWE2HUD&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuHI4wyh_QlDbBwEsQXICxo8QIKNJA_1RXcbwfN1ahxygyPgOJDS1rYem2wKWLcwWUgiVKrpQUGVHpt3daVykQ8VGC5Hj57TFB95YKM8Se8bSjYMeqtPI_HxtVtMeP4SxSH7CV83Knl_fGOd3gUuYp2asaoNVaejjNMxKPMXQffocVTb&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuGt5DiRTUpJ4-6PsFX1pIfFkIJMkkqPM7ujl7ddHE2t3ye4qiCkGswpdDBB2Wr29if0e8hyyPGX38jQGBiVIFi1uRIYH4VJs8bgxdDpDUNgeaJhe03NPhiaBARQP0Nf2NZDBpCl259aZ1EDs5jyOFpn6Zw_vtCbPQ_Y--GpC1s804nn&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuHGL2PPVRD8gn3Y0EBaUZbyCIFzPQ61Ou450IJv1uq-pJ-80ocYgIcuMzUe5sCWiU08BC3fQ3BDY5w_NgdvTvJ3WoSRlNJFb06rZYYmh-dUm9yR_rzwj3Jrailztu9ETCcQsC_s4kxWvxE_E9TWFv9WPGLUvuoDwrnoQkESXZfyn4tr&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuEWNdGP9xy-7KihBpjXXZ1HgTa3Nls983NuZsncHQBFSdUO6KMiclMEowG9p7SpyXTKaJ5eZYnsxUcV4Jh1O-0LRCdZGQwq1KfwatNqdm2kWmosB1bXDC_Zs9SSZVB4LLiNQbeXZ-9MpM2IaleGpcsUqVbtd6Ylcmb6Pm0oG6h7ozd7&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuEMdeMz9boLNPThj3YlBjz4t_VIQ0AzviMBzIPRj04jPK5v4Co2q7D3-2VdET1-QxmeXqqNM5ERUTORTxaYW-yhv9Lysk5kEaJx6K72b7Kout0lj3bKi1zC5Im_kW_eJKNierxINofA8fKnTmIItDsSdLbsXAX7IbkT1Bmr2lRhG5hQ&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuFtfZwe0netS1LLSK4-8BDMFgeHIMFdv4EzH24HX8La2HM7A93LF4UU0ySJXFpGTXgV9KvuGwqFaewzxM7M_rIz2MoYwZyAbt1N49FxUnZ0S5GFZf2fusyhQ4eYFwBsCsfkIl63EV5B9oUgPPseZ9BOi0a7dUUCA_uqf7hYfmxHmp-4&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuE1Xu8bgSWXtxX1U2nhKmOgda5lj6S7mccVJhfclHoeRyj5-cf7gzrVisYDDWKhlfbYtkqN0fSlcy9lvc1nAYiLt8LJW0M7bldnvaJ95Z5Qsn2klMMeFxMGHbD5xpkxuWDOMSR0mBUsfAyUqlfUdFudKRHdlFRuBSO6i_l-D9hC5BHV&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
    'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AcJnMuHATveG7xqy_nig4liBXOvTPR6qGSbr94zLLq-G4P8sPv3cJmYHpPIO_QgeNLNbVg7t4cAmgOm1SiTo9Ag3ZUQmlEV5fpiZoM4h40zLguKn0NMqLrVmhSidc_u7BCC3A4XtruJmgso3rcbUdJOSZCns_B1CYXSow8FD2ev2nWvD94h9&key=AIzaSyDxxUkBkujFvAJbrpndyIcyNMY2Nie5w28&maxwidth=400&maxheight=400',
  ],
};

export default mockShopDetail;
