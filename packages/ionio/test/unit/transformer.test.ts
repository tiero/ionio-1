import { AssetHash } from 'ldk';
import {
  transformArtifact,
  TemplateString,
  encodeArgument,
  PrimitiveType,
} from '../../src';

const transferWithKey = require('../fixtures/transfer_with_key.json');
const synth = require('../fixtures/synthetic_asset.json');

describe('transformArtifact', () => {
  it('should rename constructor input name and asm tokens if TemplateString()', () => {
    const artifact = transformArtifact(transferWithKey, [
      TemplateString('customName'),
    ]);
    expect(artifact.constructorInputs[0].name).toBe('customName');
    expect(artifact.functions[0].asm).toEqual(['$customName', 'OP_CHECKSIG']);
  });

  it('should encode constructor input and asm tokens if Argument', () => {
    const artifact = transformArtifact(synth, [
      AssetHash.fromHex(
        '5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
        false
      ).hex,
      AssetHash.fromHex(
        '5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
        false
      ).hex,
    ]);

    expect(artifact.constructorInputs[0].name).toBe(
      synth.constructorInputs[2].name
    );
    expect(artifact.functions[0].asm[4]).toEqual(
      encodeArgument(
        AssetHash.fromHex(
          '5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
          false
        ).hex,
        PrimitiveType.Asset
      ).toString('hex')
    );
  });
});
