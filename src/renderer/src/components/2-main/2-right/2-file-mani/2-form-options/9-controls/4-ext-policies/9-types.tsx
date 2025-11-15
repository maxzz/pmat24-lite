import { type JSX, type HTMLAttributes } from "react";
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
    IconExPol10Password,
    IconExPol11Radius,
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
    | 'radius'
    | 'bluetooth'
    | 'face';

export type ExtPolTokenType = {
    displayName: string;
    value: string;
    icon?: ExtPolTokenKey;
};

export type ExtPolTokenIcons = Record<ExtPolTokenKey, (props: HTMLAttributes<SVGSVGElement | HTMLElement>) => JSX.Element>;

export const extPolicyTokens: ExtPolTokenType[] = [ // This defines the order of the tokens in the UI
    { displayName: 'No additional credential',  /**/ value: /**/    '0', },
    { displayName: 'Password',                  /**/ value: /**/    '1', icon: 'password', },
    { displayName: 'Fingerprint',               /**/ value: /**/    '2', icon: 'fingerprint', },
    { displayName: 'PKI smart card',            /**/ value: /**/    '4', icon: 'smartcard', },
    { displayName: 'Contactless writable card', /**/ value: /**/   '20', icon: 'contactless', },
    { displayName: 'PIN',                       /**/ value: /**/   '80', icon: 'pin', },
    { displayName: 'One-Time Password',         /**/ value: /**/  '800', icon: 'otp', },
    { displayName: 'Contactless ID Card',       /**/ value: /**/  '100', icon: 'prox', },       // renamed 'Proximity ID card'. IAMSDP-2233
    { displayName: 'Device-bound Passkey',      /**/ value: /**/ '8000', icon: 'fido', },       // renamed 'FIDO Key'. IAMSDP-2233
    { displayName: 'RADIUS Authentication',     /**/ value: /**/'20000', icon: 'radius', },
    //{ displayName: 'Bluetooth',               /**/ value: /**/  '200', icon: 'bluetooth', },  // removed Bluetooth authentication policy. IAMSDP-2233
    { displayName: 'Face',                      /**/ value: /**/   '10', icon: 'face', },
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
    radius:         /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol11Radius       /**/ {...props} />,
    bluetooth:      /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol03Bluetooth    /**/ {...props} />,
    face:           /**/ (props: HTMLAttributes<SVGSVGElement>) => <IconExPol01Face         /**/ {...props} />,
};
