import { HTMLAttributes } from "react";
import {
    IconExPol01Face,
    IconExPol02Fido,
    IconExPol03Bluetooth,
    IconExPol04Proxy,
    IconExPol05Otp,
    IconExPol06Pin,
    IconExPol07Contactless,
    IconExPol08Smartcard,
    IconExPol09Fingerprint,
    IconExPol10Password
} from "@/ui/icons/normal/extended-policy";

export type ExtPolTokenKey =
    | 'password'
    | 'fingerprint'
    | 'smartcard'
    | 'contactless'
    | 'pin'
    | 'otp'
    | 'prox'
    | 'fido'
    | 'bluetooth'
    | 'face';

export type ExtPolTokenType = {
    displayName: string;
    value: string;
    icon?: ExtPolTokenKey;
};

export type ExtPolTokenIcons = Record<ExtPolTokenKey, (props: HTMLAttributes<SVGSVGElement | HTMLElement>) => JSX.Element>;

export const extPolicyTokens: ExtPolTokenType[] = [ // This defines the order of the tokens in the UI
    { displayName: 'No additional credential',  /**/ value: '0', },
    { displayName: 'Password',                  /**/ value: '0x0001', icon: 'password', },
    { displayName: 'Fingerprint',               /**/ value: '0x0002', icon: 'fingerprint', },
    { displayName: 'PKI smart card',            /**/ value: '0x0004', icon: 'smartcard', },
    { displayName: 'Contactless writable card', /**/ value: '0x0020', icon: 'contactless', },
    { displayName: 'PIN',                       /**/ value: '0x0080', icon: 'pin', },
    { displayName: 'One-Time Password',         /**/ value: '0x0800', icon: 'otp', },
    { displayName: 'Proximity ID card',         /**/ value: '0x0100', icon: 'prox', },
    { displayName: 'FIDO Key',                  /**/ value: '0x8000', icon: 'fido', },
    { displayName: 'Bluetooth',                 /**/ value: '0x0200', icon: 'bluetooth', },
    { displayName: 'Face',                      /**/ value: '0x0010', icon: 'face', },
];

export const extPolicyIcons: ExtPolTokenIcons = {
    password:       /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol10Password     /**/ {...props} />,
    fingerprint:    /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol09Fingerprint  /**/ {...props} />,
    smartcard:      /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol08Smartcard    /**/ {...props} />,
    contactless:    /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol07Contactless  /**/ {...props} />,
    pin:            /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol06Pin          /**/ {...props} />,
    otp:            /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol05Otp          /**/ {...props} />,
    prox:           /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol04Proxy        /**/ {...props} />,
    fido:           /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol02Fido         /**/ {...props} />,
    bluetooth:      /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol03Bluetooth    /**/ {...props} />,
    face:           /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol01Face         /**/ {...props} />,
};
